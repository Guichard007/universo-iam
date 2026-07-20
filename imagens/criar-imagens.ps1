# Script para gerar imagens dos artigos
# Cada imagem tem 1200x630px (padrao para redes sociais)

$artigos = @(
    @{ id=1; icon="🔐"; title="O que e IAM?"; subtitle="Guia Completo sobre Identity and Access Management"; label="IAM" },
    @{ id=2; icon="🛡️"; title="O que e PAM?"; subtitle="Privileged Access Management Explicado"; label="PAM" },
    @{ id=3; icon="📋"; title="O que e IGA?"; subtitle="Identity Governance and Administration"; label="IGA" },
    @{ id=4; icon="🔒"; title="Guia de Cyberseguranca"; subtitle="Protegendo Ativos Digitais"; label="SEGURANCA" },
    @{ id=5; icon="☁️"; title="Seguranca em Nuvem"; subtitle="Guia Completo para IAM na Cloud"; label="CLOUD" },
    @{ id=6; icon="🚀"; title="Carreira em TI"; subtitle="Como Construir sua Carreira em Seguranca"; label="CARREIRA" },
    @{ id=7; icon="🎓"; title="Certificacoes IAM"; subtitle="As Mais Valorizadas no Mercado"; label="CERTIFICACOES" },
    @{ id=8; icon="⚙️"; title="SailPoint"; subtitle="Guia Completo de Governanca em Nuvem"; label="GOVERNANCA" },
    @{ id=9; icon="🌐"; title="Microsoft Entra ID"; subtitle="Guia Completo do Azure AD"; label="AZURE" },
    @{ id=10; icon="🔑"; title="Okta"; subtitle="Gerenciamento de Identidades na Nuvem"; label="OKTA" },
    @{ id=11; icon="🖥️"; title="Active Directory"; subtitle="Guia Completo do AD"; label="AD" }
)

$htmlTemplate = @'
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
width: 1200px;
height: 630px;
background: linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0b2038 100%);
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
padding: 60px;
position: relative;
overflow: hidden;
font-family: 'Segoe UI', system-ui, sans-serif;
}
body::before {
content: '';
position: absolute;
top: -50%;
left: -50%;
width: 200%;
height: 200%;
background: radial-gradient(circle at 30% 70%, rgba(34,211,238,0.08) 0%, transparent 50%);
}
body::after {
content: '';
position: absolute;
top: 0;
left: 0;
right: 0;
height: 4px;
background: linear-gradient(90deg, #22d3ee, #00BFFF, #22d3ee);
}
.icon {
font-size: 72px;
margin-bottom: 30px;
position: relative;
z-index: 1;
}
.title {
font-size: 48px;
font-weight: 800;
color: #e6edf3;
line-height: 1.2;
margin-bottom: 20px;
position: relative;
z-index: 1;
max-width: 900px;
letter-spacing: -0.02em;
}
.subtitle {
font-size: 22px;
color: #8b949e;
position: relative;
z-index: 1;
margin-bottom: 30px;
}
.label {
display: inline-block;
font-size: 14px;
color: #22d3ee;
background: rgba(34,211,238,0.12);
padding: 8px 20px;
border-radius: 8px;
border: 1px solid rgba(34,211,238,0.3);
position: relative;
z-index: 1;
text-transform: uppercase;
letter-spacing: 0.1em;
font-weight: 600;
}
.brand {
position: absolute;
bottom: 30px;
right: 40px;
font-size: 16px;
font-weight: 700;
color: #30363d;
letter-spacing: 0.05em;
z-index: 1;
}
.corner {
position: absolute;
width: 120px;
height: 120px;
border: 2px solid rgba(34,211,238,0.2);
border-radius: 50%;
}
.corner-tl { top: -30px; left: -30px; }
.corner-br { bottom: -30px; right: -30px; }
</style>
</head>
<body>
<div class="corner corner-tl"></div>
<div class="corner corner-br"></div>
<div class="icon">ICON_PLACEHOLDER</div>
<div class="title">TITLE_PLACEHOLDER</div>
<div class="subtitle">SUBTITLE_PLACEHOLDER</div>
<div class="label">LABEL_PLACEHOLDER</div>
<div class="brand">UNIVERSO IAM</div>
</body>
</html>
'@

$outputDir = "C:\Users\GUILHERME\Documents\Default Project\universo-iam\imagens"
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

foreach ($artigo in $artigos) {
    $html = $htmlTemplate -replace 'ICON_PLACEHOLDER', $artigo.icon
    $html = $html -replace 'TITLE_PLACEHOLDER', $artigo.title
    $html = $html -replace 'SUBTITLE_PLACEHOLDER', $artigo.subtitle
    $html = $html -replace 'LABEL_PLACEHOLDER', $artigo.label
    
    $fileName = "$outputDir\artigo-$($artigo.id.ToString('D2'))-$($artigo.label.ToLower()).html"
    $html | Out-File -FilePath $fileName -Encoding UTF8
    Write-Host "Criado: $fileName" -ForegroundColor Green
}

Write-Host ""
Write-Host "Arquivos HTML criados!" -ForegroundColor Cyan
Write-Host "Para gerar as imagens PNG, abra cada arquivo HTML e faca screenshot (1200x630px)" -ForegroundColor Yellow
Write-Host "Ou use um servico como hcti.io para converter HTML em imagem" -ForegroundColor Yellow
