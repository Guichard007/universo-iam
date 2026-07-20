const sharp = require('sharp');
const path = require('path');

const artigos = [
    { 
        id: 1, 
        title: 'O que e IAM?', 
        subtitle: 'Identity and Access Management',
        label: 'IAM',
        icon: 'shield-check',
        gradient: ['#0d1117', '#0b2038', '#161b22']
    },
    { 
        id: 2, 
        title: 'O que e PAM?', 
        subtitle: 'Privileged Access Management',
        label: 'PAM',
        icon: 'key-rotate',
        gradient: ['#0d1117', '#1a0a2e', '#161b22']
    },
    { 
        id: 3, 
        title: 'O que e IGA?', 
        subtitle: 'Identity Governance and Administration',
        label: 'IGA',
        icon: 'clipboard-check',
        gradient: ['#0d1117', '#0a1628', '#161b22']
    },
    { 
        id: 4, 
        title: 'Guia de Cyberseguranca', 
        subtitle: 'Protegendo Ativos Digitais',
        label: 'SEGURANCA',
        icon: 'lock-shield',
        gradient: ['#0d1117', '#1e0a0a', '#161b22']
    },
    { 
        id: 5, 
        title: 'Seguranca em Nuvem', 
        subtitle: 'IAM na Cloud',
        label: 'CLOUD',
        icon: 'cloud-lock',
        gradient: ['#0d1117', '#0a1e2e', '#161b22']
    },
    { 
        id: 6, 
        title: 'Carreira em TI', 
        subtitle: 'Construindo sua Trajetoria',
        label: 'CARREIRA',
        icon: 'rocket-launch',
        gradient: ['#0d1117', '#1a1a0a', '#161b22']
    },
    { 
        id: 7, 
        title: 'Certificacoes IAM', 
        subtitle: 'As Mais Valorizadas no Mercado',
        label: 'CERTIFICACOES',
        icon: 'award-star',
        gradient: ['#0d1117', '#2e1a0a', '#161b22']
    },
    { 
        id: 8, 
        title: 'SailPoint', 
        subtitle: 'Governanca em Nuvem',
        label: 'GOVERNANCA',
        icon: 'cog-wheel',
        gradient: ['#0d1117', '#0a2e1a', '#161b22']
    },
    { 
        id: 9, 
        title: 'Microsoft Entra ID', 
        subtitle: 'O Novo Azure AD',
        label: 'AZURE',
        icon: 'microsoft-logo',
        gradient: ['#0d1117', '#0a1a2e', '#161b22']
    },
    { 
        id: 10, 
        title: 'Okta', 
        subtitle: 'Identidade na Nuvem',
        label: 'OKTA',
        icon: 'fingerprint',
        gradient: ['#0d1117', '#1a0a1e', '#161b22']
    },
    { 
        id: 11, 
        title: 'Active Directory', 
        subtitle: 'Diretorio Corporativo',
        label: 'AD',
        icon: 'server-stack',
        gradient: ['#0d1117', '#0e1a2e', '#161b22']
    }
];

function createSVG(artigo) {
    return `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="bg-${artigo.id}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:${artigo.gradient[0]}"/>
                <stop offset="50%" style="stop-color:${artigo.gradient[1]}"/>
                <stop offset="100%" style="stop-color:${artigo.gradient[2]}"/>
            </linearGradient>
            <linearGradient id="accent-${artigo.id}" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#22d3ee"/>
                <stop offset="50%" style="stop-color:#06b6d4"/>
                <stop offset="100%" style="stop-color:#22d3ee"/>
            </linearGradient>
            <filter id="glow-${artigo.id}">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        
        <!-- Background -->
        <rect width="1200" height="630" fill="url(#bg-${artigo.id})"/>
        
        <!-- Grid pattern -->
        <pattern id="grid-${artigo.id}" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(34,211,238,0.03)" stroke-width="1"/>
        </pattern>
        <rect width="1200" height="630" fill="url(#grid-${artigo.id})"/>
        
        <!-- Top accent line -->
        <rect x="0" y="0" width="1200" height="4" fill="url(#accent-${artigo.id})"/>
        
        <!-- Decorative circles -->
        <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(34,211,238,0.08)" stroke-width="1"/>
        <circle cx="1100" cy="530" r="100" fill="none" stroke="rgba(34,211,238,0.06)" stroke-width="1"/>
        <circle cx="200" cy="500" r="60" fill="none" stroke="rgba(34,211,238,0.05)" stroke-width="1"/>
        
        <!-- Decorative lines -->
        <line x1="0" y1="200" x2="100" y2="200" stroke="rgba(34,211,238,0.1)" stroke-width="1"/>
        <line x1="1100" y1="400" x2="1200" y2="400" stroke="rgba(34,211,238,0.1)" stroke-width="1"/>
        
        <!-- Left accent bar -->
        <rect x="60" y="180" width="4" height="270" rx="2" fill="url(#accent-${artigo.id})"/>
        
        <!-- Main content area -->
        <rect x="80" y="180" width="1040" height="270" rx="12" fill="rgba(22,27,34,0.6)" stroke="rgba(48,54,61,0.5)" stroke-width="1"/>
        
        <!-- Label -->
        <rect x="100" y="200" width="140" height="32" rx="6" fill="rgba(34,211,238,0.15)" stroke="rgba(34,211,238,0.4)" stroke-width="1"/>
        <text x="170" y="221" font-family="Segoe UI, system-ui, sans-serif" font-size="12" font-weight="700" fill="#22d3ee" text-anchor="middle" letter-spacing="2">${artigo.label}</text>
        
        <!-- Title -->
        <text x="120" y="300" font-family="Segoe UI, system-ui, sans-serif" font-size="52" font-weight="800" fill="#e6edf3" letter-spacing="-1">${artigo.title}</text>
        
        <!-- Subtitle -->
        <text x="120" y="350" font-family="Segoe UI, system-ui, sans-serif" font-size="24" fill="#8b949e" letter-spacing="0.5">${artigo.subtitle}</text>
        
        <!-- Bottom decorative elements -->
        <circle cx="1120" cy="250" r="4" fill="#22d3ee" filter="url(#glow-${artigo.id})"/>
        <circle cx="1100" cy="280" r="3" fill="#06b6d4"/>
        <circle cx="1140" cy="300" r="2" fill="#22d3ee"/>
        
        <!-- Brand -->
        <rect x="900" y="540" width="200" height="40" rx="8" fill="rgba(22,27,34,0.8)" stroke="rgba(48,54,61,0.5)" stroke-width="1"/>
        <text x="1000" y="565" font-family="Segoe UI, system-ui, sans-serif" font-size="14" font-weight="700" fill="#8b949e" text-anchor="middle" letter-spacing="3">UNIVERSO IAM</text>
        
        <!-- Bottom accent line -->
        <rect x="0" y="626" width="1200" height="4" fill="url(#accent-${artigo.id})"/>
    </svg>`;
}

async function generateImage(artigo) {
    const svg = createSVG(artigo);
    const outputDir = path.join(__dirname, 'imagens');
    const fileName = path.join(outputDir, `artigo-${artigo.id.toString().padStart(2, '0')}-${artigo.label.toLowerCase()}.png`);
    
    await sharp(Buffer.from(svg))
        .png()
        .toFile(fileName);
    
    console.log(`Criado: artigo-${artigo.id.toString().padStart(2, '0')}-${artigo.label.toLowerCase()}.png`);
}

async function main() {
    console.log('=== Gerando Novas Imagens Universo IAM ===\n');
    
    for (const artigo of artigos) {
        await generateImage(artigo);
    }
    
    console.log('\n=== 11 imagens geradas com sucesso! ===');
}

main().catch(console.error);
