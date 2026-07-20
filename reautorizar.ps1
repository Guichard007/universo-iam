# Forcar re-autorizacao com novos escopos
$RedirectUri = "http://localhost:8080"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("$RedirectUri/")
$listener.Start()

Write-Host "Servidor rodando na porta 8080" -ForegroundColor Cyan
Write-Host ""
Write-Host "Abra este link no navegador:" -ForegroundColor Yellow
Write-Host ""
Write-Host "https://accounts.google.com/o/oauth2/auth?client_id=830209937533-8eikl8p09ljqsfm91t1ldbtrsqsscdk3.apps.googleusercontent.com&redirect_uri=http://localhost:8080&scope=https://www.googleapis.com/auth/blogger&response_type=code&access_type=offline&prompt=consent&include_granted_scopes=true" -ForegroundColor White
Write-Host ""
Write-Host "Aguardando..." -ForegroundColor Gray

$context = $listener.GetContext()
$code = $context.Request.QueryString["code"]

$response = $context.Response
$response.StatusCode = 200
$buffer = [System.Text.Encoding]::UTF8.GetBytes("<html><body><h1>OK!</h1></body></html>")
$response.ContentLength64 = $buffer.Length
$response.OutputStream.Write($buffer, 0, $buffer.Length)
$response.Close()
$listener.Stop()

Write-Host "Codigo OK!" -ForegroundColor Green

# Obter token
$body = "code=$code&client_id=830209937533-8eikl8p09ljqsfm91t1ldbtrsqsscdk3.apps.googleusercontent.com&client_secret=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&redirect_uri=$RedirectUri&grant_type=authorization_code"
$tokenResponse = Invoke-RestMethod -Uri "https://oauth2.googleapis.com/token" -Method Post -Body $body -ContentType "application/x-www-form-urlencoded"
$accessToken = $tokenResponse.access_token
$refreshToken = $tokenResponse.refresh_token

$refreshToken | Out-File "C:\Users\GUILHERME\Documents\Default Project\universo-iam\refresh_token.txt" -Encoding UTF8
Write-Host "Token salvo!" -ForegroundColor Green

# Testar criacao de post
$BlogId = "1633190249834178763"
$testPost = @{kind="blogger#post"; title="Teste Permissao"; content="<p>Teste</p>"} | ConvertTo-Json

try {
    $r = Invoke-RestMethod -Uri "https://www.googleapis.com/blogger/v3/blogs/$BlogId/posts/" -Method Post -Body $testPost -ContentType "application/json" -Headers @{Authorization = "Bearer $accessToken"}
    Write-Host "POST OK! ID: $($r.id)" -ForegroundColor Green
    Invoke-RestMethod -Uri "https://www.googleapis.com/blogger/v3/blogs/$BlogId/posts/$($r.id)" -Method Delete -Headers @{Authorization = "Bearer $accessToken"}
    Write-Host "Deletado teste" -ForegroundColor Gray
} catch {
    Write-Host "ERRO: $($_.Exception.Message)" -ForegroundColor Red
}
