# Script para obter novo token - rode este script
$ClientId = "830209937533-8eikl8p09ljqsfm91t1ldbtrsqsscdk3.apps.googleusercontent.com"
$ClientSecret = "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"
$RedirectUri = "http://localhost:8080"
$scope = "https://www.googleapis.com/auth/blogger"

$authUrl = "https://accounts.google.com/o/oauth2/auth?client_id=$ClientId&redirect_uri=$RedirectUri&scope=$scope&response_type=code&access_type=offline&prompt=consent"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Obtendo novo token de acesso" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Abrindo navegador para autorizacao..." -ForegroundColor Yellow
Start-Process $authUrl

Write-Host "2. Aguardando autorizacao..." -ForegroundColor Yellow
Write-Host "   (Autorize o app no navegador)" -ForegroundColor Gray

# Iniciar servidor local
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("$RedirectUri/")
$listener.Start()

Write-Host "3. Servidor local aguardando callback na porta 8080..." -ForegroundColor Gray

$context = $listener.GetContext()
$code = $context.Request.QueryString["code"]

# Responder
$response = $context.Response
$response.StatusCode = 200
$responseString = "<html><body><h1>Autorizado!</h1><p>Pode fechar esta janela.</p></body></html>"
$buffer = [System.Text.Encoding]::UTF8.GetBytes($responseString)
$response.ContentLength64 = $buffer.Length
$response.OutputStream.Write($buffer, 0, $buffer.Length)
$response.Close()
$listener.Stop()

Write-Host "4. Codigo recebido!" -ForegroundColor Green

# Trocar por token
$body = "code=$code&client_id=$ClientId&client_secret=$ClientSecret&redirect_uri=$RedirectUri&grant_type=authorization_code"
$tokenResponse = Invoke-RestMethod -Uri "https://oauth2.googleapis.com/token" -Method Post -Body $body -ContentType "application/x-www-form-urlencoded"

$accessToken = $tokenResponse.access_token
$refreshToken = $tokenResponse.refresh_token

Write-Host "5. Token obtido!" -ForegroundColor Green
Write-Host ""

# Salvar novo refresh token
$refreshToken | Out-File -FilePath "C:\Users\GUILHERME\Documents\Default Project\universo-iam\refresh_token.txt" -Encoding UTF8
Write-Host "Novo refresh token salvo!" -ForegroundColor Green
Write-Host "Access token: $($accessToken.Substring(0,30))..." -ForegroundColor Cyan

# Testar acesso
$blogs = Invoke-RestMethod -Uri "https://www.googleapis.com/blogger/v3/users/self/blogs" -Headers @{ Authorization = "Bearer $accessToken" }
Write-Host ""
Write-Host "Blogs acessiveis:" -ForegroundColor Yellow
foreach ($blog in $blogs.items) {
    Write-Host "  - $($blog.name) (ID: $($blog.id))" -ForegroundColor White
}
