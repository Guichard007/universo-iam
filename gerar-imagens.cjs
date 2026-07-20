const sharp = require('sharp');
const path = require('path');

const artigos = [
    { id: 1, icon: '🔐', title: 'O que e IAM?', subtitle: 'Guia Completo sobre Identity and Access Management', label: 'IAM' },
    { id: 2, icon: '🛡️', title: 'O que e PAM?', subtitle: 'Privileged Access Management Explicado', label: 'PAM' },
    { id: 3, icon: '📋', title: 'O que e IGA?', subtitle: 'Identity Governance and Administration', label: 'IGA' },
    { id: 4, icon: '🔒', title: 'Guia de Cyberseguranca', subtitle: 'Protegendo Ativos Digitais', label: 'SEGURANCA' },
    { id: 5, icon: '☁️', title: 'Seguranca em Nuvem', subtitle: 'Guia Completo para IAM na Cloud', label: 'CLOUD' },
    { id: 6, icon: '🚀', title: 'Carreira em TI', subtitle: 'Como Construir sua Carreira em Seguranca', label: 'CARREIRA' },
    { id: 7, icon: '🎓', title: 'Certificacoes IAM', subtitle: 'As Mais Valorizadas no Mercado', label: 'CERTIFICACOES' },
    { id: 8, icon: '⚙️', title: 'SailPoint', subtitle: 'Guia Completo de Governanca em Nuvem', label: 'GOVERNANCA' },
    { id: 9, icon: '🌐', title: 'Microsoft Entra ID', subtitle: 'Guia Completo do Azure AD', label: 'AZURE' },
    { id: 10, icon: '🔑', title: 'Okta', subtitle: 'Gerenciamento de Identidades na Nuvem', label: 'OKTA' },
    { id: 11, icon: '🖥️', title: 'Active Directory', subtitle: 'Guia Completo do AD', label: 'AD' }
];

const outputDir = path.join(__dirname, 'imagens');

async function generateImage(artigo) {
    const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#0d1117"/>
                <stop offset="50%" style="stop-color:#161b22"/>
                <stop offset="100%" style="stop-color:#0b2038"/>
            </linearGradient>
            <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#22d3ee"/>
                <stop offset="50%" style="stop-color:#00BFFF"/>
                <stop offset="100%" style="stop-color:#22d3ee"/>
            </linearGradient>
        </defs>
        
        <!-- Background -->
        <rect width="1200" height="630" fill="url(#bg)"/>
        
        <!-- Top accent line -->
        <rect x="0" y="0" width="1200" height="4" fill="url(#accent)"/>
        
        <!-- Corner circles -->
        <circle cx="-30" cy="-30" r="60" fill="none" stroke="rgba(34,211,238,0.2)" stroke-width="2"/>
        <circle cx="1230" cy="660" r="60" fill="none" stroke="rgba(34,211,238,0.2)" stroke-width="2"/>
        
        <!-- Radial glow -->
        <circle cx="360" cy="441" r="300" fill="rgba(34,211,238,0.05)"/>
        
        <!-- Label -->
        <rect x="510" y="480" width="180" height="36" rx="8" fill="rgba(34,211,238,0.12)" stroke="rgba(34,211,238,0.3)" stroke-width="1"/>
        <text x="600" y="503" font-family="Segoe UI, system-ui, sans-serif" font-size="14" font-weight="600" fill="#22d3ee" text-anchor="middle" letter-spacing="2">${artigo.label}</text>
        
        <!-- Title -->
        <text x="600" y="320" font-family="Segoe UI, system-ui, sans-serif" font-size="48" font-weight="800" fill="#e6edf3" text-anchor="middle" letter-spacing="-1">${artigo.title}</text>
        
        <!-- Subtitle -->
        <text x="600" y="380" font-family="Segoe UI, system-ui, sans-serif" font-size="22" fill="#8b949e" text-anchor="middle">${artigo.subtitle}</text>
        
        <!-- Brand -->
        <text x="1140" y="600" font-family="Segoe UI, system-ui, sans-serif" font-size="16" font-weight="700" fill="#30363d" text-anchor="end" letter-spacing="1">UNIVERSO IAM</text>
    </svg>`;
    
    const fileName = path.join(outputDir, `artigo-${artigo.id.toString().padStart(2, '0')}-${artigo.label.toLowerCase()}.png`);
    
    await sharp(Buffer.from(svg))
        .png()
        .toFile(fileName);
    
    console.log(`Criado: ${fileName}`);
}

async function main() {
    console.log('Gerando imagens para UNIVERSO IAM...\n');
    
    for (const artigo of artigos) {
        await generateImage(artigo);
    }
    
    console.log('\nTodas as imagens foram geradas!');
    console.log(`Pasta: ${outputDir}`);
}

main().catch(console.error);
