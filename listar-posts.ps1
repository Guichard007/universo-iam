# Listar posts existentes no Blogger
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

# Listar posts
$url = "https://www.googleapis.com/blogger/v3/blogs/$BlogId/posts?maxResults=20"
$posts = Invoke-RestMethod -Uri $url -Headers @{ Authorization = "Bearer $accessToken" }

Write-Host "Posts existentes no Blogger:" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan
foreach ($post in $posts.items) {
    Write-Host "- $($post.title)" -ForegroundColor White
}
Write-Host ""
Write-Host "Total: $($posts.items.Count) posts" -ForegroundColor Yellow
