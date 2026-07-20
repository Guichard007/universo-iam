const sharp = require('sharp');

const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0d1117"/>
      <stop offset="100%" style="stop-color:#161b22"/>
    </linearGradient>
    <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#22d3ee;stop-opacity:0"/>
      <stop offset="50%" style="stop-color:#22d3ee;stop-opacity:0.3"/>
      <stop offset="100%" style="stop-color:#22d3ee;stop-opacity:0"/>
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  
  <!-- Decorative lines -->
  <rect x="0" y="620" width="1200" height="2" fill="url(#glow)"/>
  <rect x="0" y="8" width="1200" height="2" fill="url(#glow)"/>
  
  <!-- Grid pattern -->
  <g opacity="0.05">
    ${Array.from({length: 20}, (_, i) => `<line x1="${i * 60}" y1="0" x2="${i * 60}" y2="630" stroke="#22d3ee" stroke-width="1"/>`).join('\n    ')}
    ${Array.from({length: 11}, (_, i) => `<line x1="0" y1="${i * 60}" x2="1200" y2="${i * 60}" stroke="#22d3ee" stroke-width="1"/>`).join('\n    ')}
  </g>
  
  <!-- Central shield -->
  <g transform="translate(600, 280)">
    <!-- Shield outline -->
    <path d="M0,-120 L100,-80 L100,40 Q100,120 0,160 Q-100,120 -100,40 L-100,-80 Z" 
          fill="none" stroke="#22d3ee" stroke-width="3" opacity="0.8"/>
    <path d="M0,-100 L85,-65 L85,35 Q85,105 0,140 Q-85,105 -85,35 L-85,-65 Z" 
          fill="#0d1117" stroke="#30363d" stroke-width="2"/>
    
    <!-- Lock icon inside shield -->
    <rect x="-30" y="-10" width="60" height="50" rx="5" fill="#22d3ee" opacity="0.9"/>
    <path d="M-15,-10 L-15,-30 Q-15,-55 0,-55 Q15,-55 15,-30 L15,-10" 
          fill="none" stroke="#22d3ee" stroke-width="6" stroke-linecap="round"/>
    <circle cx="0" cy="15" r="8" fill="#0d1117"/>
    <rect x="-2" y="15" width="4" height="12" fill="#0d1117"/>
  </g>
  
  <!-- Floating keys -->
  <g transform="translate(200, 200)" opacity="0.6">
    <circle cx="0" cy="0" r="25" fill="none" stroke="#22d3ee" stroke-width="2"/>
    <rect x="20" y="-5" width="40" height="10" rx="2" fill="#22d3ee"/>
    <rect x="45" y="-8" width="3" height="16" fill="#22d3ee"/>
    <rect x="55" y="-5" width="3" height="10" fill="#22d3ee"/>
  </g>
  
  <g transform="translate(1000, 400)" opacity="0.6">
    <circle cx="0" cy="0" r="25" fill="none" stroke="#22d3ee" stroke-width="2"/>
    <rect x="20" y="-5" width="40" height="10" rx="2" fill="#22d3ee"/>
    <rect x="45" y="-8" width="3" height="16" fill="#22d3ee"/>
    <rect x="55" y="-5" width="3" height="10" fill="#22d3ee"/>
  </g>
  
  <!-- Connection lines -->
  <line x1="250" y1="200" x2="500" y2="280" stroke="#22d3ee" stroke-width="1" opacity="0.3" stroke-dasharray="5,5"/>
  <line x1="950" y1="400" x2="700" y2="280" stroke="#22d3ee" stroke-width="1" opacity="0.3" stroke-dasharray="5,5"/>
  
  <!-- Text -->
  <text x="600" y="480" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="48" font-weight="800" fill="#e6edf3">PRIVILEGED ACCESS</text>
  <text x="600" y="535" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="48" font-weight="800" fill="#22d3ee">MANAGEMENT</text>
  <text x="600" y="580" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="20" fill="#8b949e">Controle. Monitore. Proteja.</text>
  
  <!-- Badge -->
  <rect x="520" y="30" width="160" height="35" rx="17" fill="#22d3ee" opacity="0.15"/>
  <text x="600" y="53" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="14" font-weight="600" fill="#22d3ee">UNIVERSO IAM</text>
</svg>`;

sharp(Buffer.from(svg))
  .resize(1200, 630)
  .png()
  .toFile('C:\\Users\\GUILHERME\\Documents\\Default Project\\universo-iam\\public\\imagens\\artigo-pam.png')
  .then(() => console.log('Imagem PAM criada!'))
  .catch(err => console.error('Erro:', err));
