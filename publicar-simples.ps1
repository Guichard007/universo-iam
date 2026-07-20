# Publicar artigos com conteudo simplificado
$ClientId = "830209937533-8eikl8p09ljqsfm91t1ldbtrsqsscdk3.apps.googleusercontent.com"
$ClientSecret = "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"
$RefreshToken = "1//0hn1zW1AebzGwCgYIARAAGBESNwF-L9IrXrjLSH9HPCPyfbVnIQPR_4UcQFR_MUdx_xpIpw7r0R0PQjvWZ5wlR09q6zoFU_45N88"
$BlogId = "1633190249834178763"
$artigosPath = "C:\Users\GUILHERME\Documents\Default Project\universo-iam\artigos-blogger"

# Renovar token
$body = @{
    client_id = $ClientId
    client_secret = $ClientSecret
    refresh_token = $RefreshToken
    grant_type = "refresh_token"
}
$tokenResponse = Invoke-RestMethod -Uri "https://oauth2.googleapis.com/token" -Method Post -Body $body -ContentType "application/x-www-form-urlencoded"
$accessToken = $tokenResponse.access_token
Write-Host "Token renovado!" -ForegroundColor Green

# Artigos para publicar (apenas os que faltam)
$artigosParaPublicar = @(
    "02-pam-o-que-e.html",
    "03-iga-o-que-e.html",
    "04-cybersecurity-guia.html",
    "09-entra-id-guia.html",
    "10-okta-guia.html",
    "11-active-directory.html"
)

foreach ($arquivo in $artigosParaPublicar) {
    $caminho = Join-Path $artigosPath $arquivo
    if (!(Test-Path $caminho)) {
        Write-Host "[SKIP] Arquivo nao encontrado: $arquivo" -ForegroundColor Gray
        continue
    }
    
    $content = Get-Content -Path $caminho -Raw -Encoding UTF8
    
    # Extrair titulo
    if ($content -match '<h1>(.*?)</h1>') {
        $title = $matches[1] -replace '<[^>]+>', ''
    } else {
        $title = $arquivo -replace '\.html$', ''
    }
    
    Write-Host "Publicando: $title" -ForegroundColor Yellow
    
    # Criar post via API
    $postBody = @{
        kind = "blogger#post"
        title = $title
        content = $content
        labels = @("IAM", "Identity Security")
    }
    
    $json = $postBody | ConvertTo-Json -Depth 3 -Compress
    
    try {
        $result = Invoke-RestMethod -Uri "https://www.googleapis.com/blogger/v3/blogs/$BlogId/posts" `
            -Method Post `
            -Body ([System.Text.Encoding]::UTF8.GetBytes($json)) `
            -ContentType "application/json; charset=UTF-8" `
            -Headers @{ Authorization = "Bearer $accessToken" }
        
        Write-Host "  [OK] Publicado com ID: $($result.id)" -ForegroundColor Green
    } catch {
        Write-Host "  [ERRO] $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Start-Sleep -Seconds 3
}

Write-Host ""
Write-Host "Concluido!" -ForegroundColor Cyan
