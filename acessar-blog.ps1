# Acessar blog diretamente pelo Blog ID
$ClientId = "830209937533-8eikl8p09ljqsfm91t1ldbtrsqsscdk3.apps.googleusercontent.com"
$ClientSecret = "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"
$RefreshToken = (Get-Content "C:\Users\GUILHERME\Documents\Default Project\universo-iam\refresh_token.txt" -Raw).Trim()
$BlogId = "1633190249834178763"

# Renovar token
$body = "client_id=$ClientId&client_secret=$ClientSecret&refresh_token=$RefreshToken&grant_type=refresh_token"
$tokenResponse = Invoke-RestMethod -Uri "https://oauth2.googleapis.com/token" -Method Post -Body $body -ContentType "application/x-www-form-urlencoded"
$at = $tokenResponse.access_token
Write-Host "Token OK" -ForegroundColor Green

# Listar posts existentes
Write-Host ""
Write-Host "Verificando blog ID: $BlogId" -ForegroundColor Yellow
try {
    $posts = Invoke-RestMethod -Uri "https://www.googleapis.com/blogger/v3/blogs/$BlogId/posts?maxResults=20" -Headers @{Authorization = "Bearer $at"}
    Write-Host "Posts encontrados: $($posts.items.Count)" -ForegroundColor Green
    foreach ($p in $posts.items) {
        Write-Host "  - $($p.title)" -ForegroundColor White
    }
} catch {
    Write-Host "ERRO ao acessar blog: $($_.Exception.Message)" -ForegroundColor Red
}

# Tentar criar post teste
Write-Host ""
Write-Host "Tentando criar post teste..." -ForegroundColor Yellow
$testPost = @{
    kind = "blogger#post"
    title = "Teste API v2"
    content = "<p>Teste de publicacao</p>"
} | ConvertTo-Json

try {
    $r = Invoke-RestMethod -Uri "https://www.googleapis.com/blogger/v3/blogs/$BlogId/posts/" -Method Post -Body $testPost -ContentType "application/json" -Headers @{Authorization = "Bearer $at"}
    Write-Host "POST OK! ID: $($r.id)" -ForegroundColor Green
    Write-Host "URL: $($r.url)" -ForegroundColor Cyan
    
    # Deletar post de teste
    Invoke-RestMethod -Uri "https://www.googleapis.com/blogger/v3/blogs/$BlogId/posts/$($r.id)" -Method Delete -Headers @{Authorization = "Bearer $at"}
    Write-Host "Post de teste removido" -ForegroundColor Gray
} catch {
    Write-Host "POST ERRO: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $sr = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $errBody = $sr.ReadToEnd()
        Write-Host "Body: $errBody" -ForegroundColor Red
    }
}
