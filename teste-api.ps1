# Teste com API correta
$ClientId = "830209937533-8eikl8p09ljqsfm91t1ldbtrsqsscdk3.apps.googleusercontent.com"
$ClientSecret = "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"
$RefreshToken = "1//0hn1zW1AebzGwCgYIARAAGBESNwF-L9IrXrjLSH9HPCPyfbVnIQPR_4UcQFR_MUdx_xpIpw7r0R0PQjvWZ5wlR09q6zoFU_45N88"
$BlogId = "1633190249834178763"

# Renovar token
$body = "client_id=$ClientId&client_secret=$ClientSecret&refresh_token=$RefreshToken&grant_type=refresh_token"
$tokenResponse = Invoke-RestMethod -Uri "https://oauth2.googleapis.com/token" -Method Post -Body $body -ContentType "application/x-www-form-urlencoded"
$accessToken = $tokenResponse.access_token
Write-Host "Token: $($accessToken.Substring(0,30))..." -ForegroundColor Cyan

# Listar blogs para confirmar acesso
Write-Host "Listando blogs..." -ForegroundColor Yellow
$blogs = Invoke-RestMethod -Uri "https://www.googleapis.com/blogger/v3/users/self/blogs" -Headers @{ Authorization = "Bearer $accessToken" }
Write-Host "Blogs encontrados:" -ForegroundColor Green
foreach ($blog in $blogs.items) {
    Write-Host "  - $($blog.name) (ID: $($blog.id))" -ForegroundColor White
}

# Criar post via URL correta
Write-Host ""
Write-Host "Criando post de teste..." -ForegroundColor Yellow

$postJson = @{
    kind = "blogger#post"
    title = "Teste de Publicacao"
    content = "<p>Artigo de teste</p>"
} | ConvertTo-Json

$url = "https://www.googleapis.com/blogger/v3/blogs/$BlogId/posts/"
Write-Host "URL: $url" -ForegroundColor Gray

try {
    $result = Invoke-RestMethod -Uri $url -Method Post -Body $postJson -ContentType "application/json" -Headers @{ Authorization = "Bearer $accessToken" }
    Write-Host "SUCESSO! Post criado: $($result.id)" -ForegroundColor Green
} catch {
    Write-Host "ERRO: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response: $responseBody" -ForegroundColor Red
    }
}
