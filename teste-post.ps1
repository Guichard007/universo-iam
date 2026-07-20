# Teste simples de publicacao
$ClientId = "830209937533-8eikl8p09ljqsfm91t1ldbtrsqsscdk3.apps.googleusercontent.com"
$ClientSecret = "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"
$RefreshToken = "1//0hn1zW1AebzGwCgYIARAAGBESNwF-L9IrXrjLSH9HPCPyfbVnIQPR_4UcQFR_MUdx_xpIpw7r0R0PQjvWZ5wlR09q6zoFU_45N88"
$BlogId = "1633190249834178763"

# Renovar token
$body = @{
    client_id = $ClientId
    client_secret = $ClientSecret
    refresh_token = $RefreshToken
    grant_type = "refresh_token"
}
$tokenResponse = Invoke-RestMethod -Uri "https://oauth2.googleapis.com/token" -Method Post -Body $body -ContentType "application/x-www-form-urlencoded"
$accessToken = $tokenResponse.access_token

# Post simples para teste
$testPost = @{
    kind = "blogger#post"
    title = "Artigo de Teste - PAM"
    content = "<h2>Privileged Access Management (PAM)</h2><p>Este e um artigo de teste sobre PAM.</p>"
    labels = @("IAM", "PAM")
}

$json = $testPost | ConvertTo-Json -Depth 3
Write-Host "JSON:" -ForegroundColor Yellow
Write-Host $json

try {
    $result = Invoke-RestMethod -Uri "https://www.googleapis.com/blogger/v3/blogs/$BlogId/posts" `
        -Method Post `
        -Body $json `
        -ContentType "application/json" `
        -Headers @{ Authorization = "Bearer $accessToken" }
    
    Write-Host "SUCESSO! Post ID: $($result.id)" -ForegroundColor Green
    Write-Host "URL: $($result.url)" -ForegroundColor Cyan
} catch {
    Write-Host "ERRO: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Response: $($_.Exception.Response)" -ForegroundColor Red
}
