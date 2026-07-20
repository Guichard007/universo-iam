# Publicar apenas artigos que ainda nao existem no Blogger
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

# Obter posts existentes
$url = "https://www.googleapis.com/blogger/v3/blogs/$BlogId/posts?maxResults=20"
$posts = Invoke-RestMethod -Uri $url -Headers @{ Authorization = "Bearer $accessToken" }
$existingTitles = $posts.items | ForEach-Object { $_.title.ToLower() }

Write-Host "Posts existentes: $($existingTitles.Count)" -ForegroundColor Cyan
Write-Host ""

# Listar artigos para publicar
$artigos = Get-ChildItem -Path $artigosPath -Filter "*.html" | Sort-Object Name
$publicados = 0
$erros = 0

foreach ($artigo in $artigos) {
    $content = Get-Content -Path $artigo.FullName -Raw -Encoding UTF8
    
    # Extrair titulo
    if ($content -match '<h1>(.*?)</h1>') {
        $title = $matches[1] -replace '<[^>]+>', ''
    } else {
        $title = [System.IO.Path]::GetFileNameWithoutExtension($artigo.Name)
    }
    
    # Verificar se ja existe
    $titleLower = $title.ToLower()
    $jaExiste = $existingTitles | Where-Object { $_ -like "*$titleLower*" -or $titleLower -like "*$_*" }
    
    if ($jaExiste) {
        Write-Host "[SKIP] Ja existe: $title" -ForegroundColor Gray
        continue
    }
    
    # Extrair labels
    if ($content -match '<strong>Labels:</strong>\s*(.*?)<') {
        $labels = $matches[1].Split(',') | ForEach-Object { $_.Trim() }
    } else {
        $labels = @("IAM")
    }
    
    # Criar post
    $post = @{
        kind = "blogger#post"
        title = $title
        content = $content
        labels = $labels
    } | ConvertTo-Json -Depth 3
    
    $postUrl = "https://www.googleapis.com/blogger/v3/blogs/$BlogId/posts"
    
    try {
        $result = Invoke-RestMethod -Uri $postUrl -Method Post -Body $post -ContentType "application/json" -Headers @{ Authorization = "Bearer $accessToken" }
        Write-Host "[OK] Publicado: $title" -ForegroundColor Green
        $publicados++
    } catch {
        Write-Host "[ERRO] Falha: $title" -ForegroundColor Red
        Write-Host "  $($_.Exception.Message)" -ForegroundColor Red
        $erros++
    }
    
    Start-Sleep -Seconds 2
}

Write-Host ""
Write-Host "==============================" -ForegroundColor Cyan
Write-Host "Publicados: $publicados" -ForegroundColor Green
Write-Host "Erros: $erros" -ForegroundColor Red
