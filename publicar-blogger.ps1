# UNIVERSO IAM - Script de Publicacao no Blogger
# Configuracoes
$ClientId = "830209937533-8eikl8p09ljqsfm91t1ldbtrsqsscdk3.apps.googleusercontent.com"
$ClientSecret = "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"
$BlogId = "1633190249834178763"
$RedirectUri = "http://localhost:8080"
$scope = "https://www.googleapis.com/auth/blogger"

# URLs do Google OAuth
$authUrl = "https://accounts.google.com/o/oauth2/auth?client_id=$ClientId&redirect_uri=$RedirectUri&scope=$scope&response_type=code&access_type=offline&prompt=consent"

# Pasta dos artigos
$artigosPath = "C:\Users\GUILHERME\Documents\Default Project\universo-iam\artigos-blogger"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   UNIVERSO IAM - Publicador Blogger" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Funcao para obter token de acesso
function Get-AccessToken {
    Write-Host "1. Abrindo navegador para autorizacao..." -ForegroundColor Yellow
    Start-Process $authUrl
    
    Write-Host "2. Aguardando autorizacao no navegador..." -ForegroundColor Yellow
    Write-Host "   (Uma janela do navegador deve abrir)" -ForegroundColor Gray
    
    # Iniciar servidor local para receber callback
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("$RedirectUri/")
    $listener.Start()
    
    Write-Host "   Servidor local aguardando callback..." -ForegroundColor Gray
    
    # Aguardar requisicao
    $context = $listener.GetContext()
    $code = $context.Request.QueryString["code"]
    
    # Responder ao navegador
    $response = $context.Response
    $response.StatusCode = 200
    $responseString = "<html><body><h1>Autorizado!</h1><p>Pode fechar esta janela.</p></body></html>"
    $buffer = [System.Text.Encoding]::UTF8.GetBytes($responseString)
    $response.ContentLength64 = $buffer.Length
    $response.OutputStream.Write($buffer, 0, $buffer.Length)
    $response.Close()
    $listener.Stop()
    
    Write-Host "3. Codigo de autorizacao recebido!" -ForegroundColor Green
    
    # Trocar codigo por token
    Write-Host "4. Obtendo token de acesso..." -ForegroundColor Yellow
    
    $body = "code=$code&client_id=$ClientId&client_secret=$ClientSecret&redirect_uri=$RedirectUri&grant_type=authorization_code"
    
    $tokenResponse = Invoke-RestMethod -Uri "https://oauth2.googleapis.com/token" -Method Post -Body $body -ContentType "application/x-www-form-urlencoded"
    
    $accessToken = $tokenResponse.access_token
    $refreshToken = $tokenResponse.refresh_token
    
    Write-Host "5. Token obtido com sucesso!" -ForegroundColor Green
    
    # Salvar refresh token para uso futuro
    $refreshToken | Out-File -FilePath "$artigosPath\..\refresh_token.txt" -Encoding UTF8
    Write-Host "   Refresh token salvo em refresh_token.txt" -ForegroundColor Gray
    
    return $accessToken
}

# Funcao para renovar token
function Refresh-AccessToken {
    param([string]$RefreshToken)
    
    $body = "client_id=$ClientId&client_secret=$ClientSecret&refresh_token=$RefreshToken&grant_type=refresh_token"
    
    $tokenResponse = Invoke-RestMethod -Uri "https://oauth2.googleapis.com/token" -Method Post -Body $body -ContentType "application/x-www-form-urlencoded"
    
    return $tokenResponse.access_token
}

# Funcao para publicar artigo
function Publish-Article {
    param(
        [string]$AccessToken,
        [string]$FilePath
    )
    
    $content = Get-Content -Path $FilePath -Raw -Encoding UTF8
    
    # Extrair titulo
    if ($content -match '<h1>(.*?)</h1>') {
        $title = $matches[1]
    } else {
        $title = [System.IO.Path]::GetFileNameWithoutExtension($FilePath)
    }
    
    # Extrair labels
    if ($content -match '<strong>Labels:</strong>\s*(.*?)<') {
        $labels = $matches[1].Split(',') | ForEach-Object { $_.Trim() }
    } else {
        $labels = @("IAM")
    }
    
    # Remover tags HTML do titulo para o titulo do post
    $titleClean = $title -replace '<[^>]+>', ''
    
    # Criar post
    $post = @{
        kind = "blogger#post"
        title = $titleClean
        content = $content
        labels = $labels
    } | ConvertTo-Json -Depth 3
    
    $url = "https://www.googleapis.com/blogger/v3/blogs/$BlogId/posts"
    
    try {
        $result = Invoke-RestMethod -Uri $url -Method Post -Body $post -ContentType "application/json" -Headers @{ Authorization = "Bearer $AccessToken" }
        Write-Host "   [OK] Publicado: $titleClean" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "   [ERRO] Falha ao publicar: $titleClean" -ForegroundColor Red
        Write-Host "   $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Verificar se ja tem refresh token
$refreshTokenFile = "$artigosPath\..\refresh_token.txt"
if (Test-Path $refreshTokenFile) {
    Write-Host "Refresh token encontrado. Renovando acesso..." -ForegroundColor Yellow
    $refreshToken = Get-Content $refreshTokenFile -Raw
    $accessToken = Refresh-AccessToken -RefreshToken $refreshToken
    Write-Host "Acesso renovado!" -ForegroundColor Green
} else {
    $accessToken = Get-AccessToken
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Publicando artigos no Blogger..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Listar todos os arquivos HTML
$artigos = Get-ChildItem -Path $artigosPath -Filter "*.html" | Sort-Object Name

$totalArtigos = $artigos.Count
$sucesso = 0
$erros = 0

Write-Host "Encontrados $totalArtigos artigos para publicar" -ForegroundColor Yellow
Write-Host ""

foreach ($artigo in $artigos) {
    Write-Host "Processando: $($artigo.Name)" -ForegroundColor White
    $result = Publish-Article -AccessToken $accessToken -FilePath $artigo.FullName
    
    if ($result) {
        $sucesso++
    } else {
        $erros++
    }
    
    # Delay entre posts para evitar rate limiting
    Start-Sleep -Seconds 2
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Resultado Final" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Total: $totalArtigos" -ForegroundColor White
Write-Host "   Sucesso: $sucesso" -ForegroundColor Green
Write-Host "   Erros: $erros" -ForegroundColor Red
Write-Host ""
Write-Host "Acesse seu blog: https://universoiam.blogspot.com/" -ForegroundColor Cyan
Write-Host ""
