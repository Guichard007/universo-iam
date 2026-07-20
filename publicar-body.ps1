# Publicar artigos - extrair apenas o conteudo do body
$ClientId = "830209937533-8eikl8p09ljqsfm91t1ldbtrsqsscdk3.apps.googleusercontent.com"
$ClientSecret = "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"
$RefreshToken = Get-Content "C:\Users\GUILHERME\Documents\Default Project\universo-iam\refresh_token.txt" -Raw
$BlogId = "1633190249834178763"
$artigosPath = "C:\Users\GUILHERME\Documents\Default Project\universo-iam\artigos-blogger"

# Renovar token
$body = "client_id=$ClientId&client_secret=$ClientSecret&refresh_token=$RefreshToken&grant_type=refresh_token"
$tokenResponse = Invoke-RestMethod -Uri "https://oauth2.googleapis.com/token" -Method Post -Body $body -ContentType "application/x-www-form-urlencoded"
$accessToken = $tokenResponse.access_token
Write-Host "Token renovado!" -ForegroundColor Green

# Listar posts existentes
$posts = Invoke-RestMethod -Uri "https://www.googleapis.com/blogger/v3/blogs/$BlogId/posts?maxResults=20" -Headers @{ Authorization = "Bearer $accessToken" }
$existingTitles = $posts.items | ForEach-Object { $_.title }
Write-Host "Posts existentes: $($existingTitles.Count)" -ForegroundColor Cyan

# Artigos para publicar
$artigos = Get-ChildItem -Path $artigosPath -Filter "*.html" | Sort-Object Name
$publicados = 0

foreach ($artigo in $artigos) {
    $html = Get-Content -Path $artigo.FullName -Raw -Encoding UTF8
    
    # Extrair titulo do <h1>
    if ($html -match '<h1>(.*?)</h1>') {
        $title = $matches[1] -replace '<[^>]+>', ''
    } else {
        $title = $artigo.BaseName
    }
    
    # Verificar se ja existe
    if ($existingTitles -contains $title) {
        Write-Host "[SKIP] $title" -ForegroundColor Gray
        continue
    }
    
    # Extrair conteudo do body
    if ($html -match '<body[^>]*>(.*?)</body>') {
        $content = $matches[1].Trim()
    } elseif ($html -match '<body[^>]*>(.*)') {
        $content = $matches[1].Trim()
    } else {
        $content = $html
    }
    
    # Limpar DOCTYPE e tags html/head
    $content = $content -replace '<!DOCTYPE[^>]*>', '' -replace '<html[^>]*>', '' -replace '</html>', '' -replace '<head[^>]*>.*?</head>', '' -replace '<meta[^>]*>', ''
    
    Write-Host "Publicando: $title" -ForegroundColor Yellow
    
    # Criar post
    $postBody = @{
        kind = "blogger#post"
        title = $title
        content = $content
        labels = @("IAM")
    }
    
    $json = $postBody | ConvertTo-Json -Depth 3
    
    try {
        $result = Invoke-RestMethod -Uri "https://www.googleapis.com/blogger/v3/blogs/$BlogId/posts/" `
            -Method Post `
            -Body ([System.Text.Encoding]::UTF8.GetBytes($json)) `
            -ContentType "application/json; charset=UTF-8" `
            -Headers @{ Authorization = "Bearer $accessToken" }
        
        Write-Host "  [OK] Publicado!" -ForegroundColor Green
        $publicados++
        $existingTitles += $title
    } catch {
        Write-Host "  [ERRO] $($_.Exception.Message)" -ForegroundColor Red
    }
    
    Start-Sleep -Seconds 2
}

Write-Host ""
Write-Host "Total publicados: $publicados" -ForegroundColor Green
