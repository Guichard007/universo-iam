# Passo 1: Iniciar servidor e aguardar
$RedirectUri = "http://localhost:8080"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("$RedirectUri/")
$listener.Start()

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Servidor rodando na porta 8080" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "AGORA autorize neste link:" -ForegroundColor Yellow
Write-Host ""
Write-Host "https://accounts.google.com/o/oauth2/auth?client_id=830209937533-8eikl8p09ljqsfm91t1ldbtrsqsscdk3.apps.googleusercontent.com&redirect_uri=http://localhost:8080&scope=https://www.googleapis.com/auth/blogger&response_type=code&access_type=offline&prompt=consent" -ForegroundColor White
Write-Host ""
Write-Host "Aguardando autorizacao..." -ForegroundColor Gray

# Aguardar callback
$context = $listener.GetContext()
$code = $context.Request.QueryString["code"]

# Responder
$response = $context.Response
$response.StatusCode = 200
$buffer = [System.Text.Encoding]::UTF8.GetBytes("<html><body><h1>Autorizado!</h1><p>Pode fechar.</p></body></html>")
$response.ContentLength64 = $buffer.Length
$response.OutputStream.Write($buffer, 0, $buffer.Length)
$response.Close()
$listener.Stop()

Write-Host "Codigo recebido!" -ForegroundColor Green

# Trocar por token
$body = "code=$code&client_id=830209937533-8eikl8p09ljqsfm91t1ldbtrsqsscdk3.apps.googleusercontent.com&client_secret=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&redirect_uri=$RedirectUri&grant_type=authorization_code"
$tokenResponse = Invoke-RestMethod -Uri "https://oauth2.googleapis.com/token" -Method Post -Body $body -ContentType "application/x-www-form-urlencoded"

$refreshToken = $tokenResponse.refresh_token
$accessToken = $tokenResponse.access_token

$refreshToken | Out-File -FilePath "C:\Users\GUILHERME\Documents\Default Project\universo-iam\refresh_token.txt" -Encoding UTF8

Write-Host "Token obtido!" -ForegroundColor Green
Write-Host ""

# Testar blogs
$blogs = Invoke-RestMethod -Uri "https://www.googleapis.com/blogger/v3/users/self/blogs" -Headers @{Authorization = "Bearer $accessToken"}
Write-Host "Blogs acessiveis:" -ForegroundColor Yellow
foreach ($blog in $blogs.items) {
    Write-Host "  - $($blog.name) (ID: $($blog.id))" -ForegroundColor White
}
