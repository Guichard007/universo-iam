# Verificar token e listar blogs
$ClientId = "830209937533-8eikl8p09ljqsfm91t1ldbtrsqsscdk3.apps.googleusercontent.com"
$ClientSecret = "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"
$RefreshToken = (Get-Content "C:\Users\GUILHERME\Documents\Default Project\universo-iam\refresh_token.txt" -Raw).Trim()

# Renovar
$body = "client_id=$ClientId&client_secret=$ClientSecret&refresh_token=$RefreshToken&grant_type=refresh_token"
try {
    $tokenResponse = Invoke-RestMethod -Uri "https://oauth2.googleapis.com/token" -Method Post -Body $body -ContentType "application/x-www-form-urlencoded"
    $at = $tokenResponse.access_token
    Write-Host "Token renovado OK" -ForegroundColor Green
} catch {
    Write-Host "ERRO ao renovar token: $($_.Exception.Message)" -ForegroundColor Red
    exit
}

# Listar blogs
try {
    $blogs = Invoke-RestMethod -Uri "https://www.googleapis.com/blogger/v3/users/self/blogs" -Headers @{Authorization = "Bearer $at"}
    Write-Host "Blogs encontrados: $($blogs.items.Count)" -ForegroundColor Green
    foreach ($b in $blogs.items) {
        Write-Host "  - $($b.name) | ID: $($b.id)" -ForegroundColor White
    }
} catch {
    Write-Host "ERRO ao listar blogs: $($_.Exception.Message)" -ForegroundColor Red
}

# Criar post teste
Write-Host ""
Write-Host "Testando criacao de post..." -ForegroundColor Yellow
$testPost = @{
    kind = "blogger#post"
    title = "Teste API - Delete me"
    content = "<p>Teste</p>"
} | ConvertTo-Json

try {
    $r = Invoke-RestMethod -Uri "https://www.googleapis.com/blogger/v3/blogs/1633190249834178763/posts/" -Method Post -Body $testPost -ContentType "application/json" -Headers @{Authorization = "Bearer $at"}
    Write-Host "POST OK! ID: $($r.id)" -ForegroundColor Green
} catch {
    Write-Host "POST ERRO: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $sr = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        Write-Host "Body: $($sr.ReadToEnd())" -ForegroundColor Red
    }
}
