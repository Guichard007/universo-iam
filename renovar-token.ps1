# Script para renovar token do Blogger
$ClientId = "830209937533-8eikl8p09ljqsfm91t1ldbtrsqsscdk3.apps.googleusercontent.com"
$ClientSecret = "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"
$RefreshToken = "1//0hn1zW1AebzGwCgYIARAAGBESNwF-L9IrXrjLSH9HPCPyfbVnIQPR_4UcQFR_MUdx_xpIpw7r0R0PQjvWZ5wlR09q6zoFU_45N88"

Write-Host "Tentando renovar token..." -ForegroundColor Yellow

$body = @{
    client_id = $ClientId
    client_secret = $ClientSecret
    refresh_token = $RefreshToken
    grant_type = "refresh_token"
}

try {
    $response = Invoke-RestMethod -Uri "https://oauth2.googleapis.com/token" -Method Post -Body $body -ContentType "application/x-www-form-urlencoded"
    Write-Host "Token renovado com sucesso!" -ForegroundColor Green
    Write-Host "Access Token: $($response.access_token.Substring(0,20))..." -ForegroundColor Cyan
    
    # Testar acesso
    $BlogId = "1633190249834178763"
    $testUrl = "https://www.googleapis.com/blogger/v3/blogs/$BlogId/posts?maxResults=1"
    $testResult = Invoke-RestMethod -Uri $testUrl -Headers @{ Authorization = "Bearer $($response.access_token)" }
    Write-Host "Acesso ao blog confirmado!" -ForegroundColor Green
    Write-Host "Posts encontrados: $($testResult.items.Count)" -ForegroundColor Cyan
    
} catch {
    Write-Host "Erro: $($_.Exception.Message)" -ForegroundColor Red
}
