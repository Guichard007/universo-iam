const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Configuracoes
const CLIENT_ID = "830209937533-8eikl8p09ljqsfm91t1ldbtrsqsscdk3.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const BLOG_ID = "1633190249834178763";
const REFRESH_TOKEN = "1//0hn1zW1AebzGwCgYIARAAGBESNwF-L9IrXrjLSH9HPCPyfbVnIQPR_4UcQFR_MUdx_xpIpw7r0R0PQjvWZ5wlR09q6zoFU_45N88";

const imagensDir = path.join(__dirname, 'imagens');

// Mapeamento de artigos para imagens
const mapeamento = [
    { postTitle: 'O que e IAM', imagem: 'artigo-01-iam.png' },
    { postTitle: 'PAM', imagem: 'artigo-02-pam.png' },
    { postTitle: 'IGA', imagem: 'artigo-03-iga.png' },
    { postTitle: 'Cyberseguranca', imagem: 'artigo-04-seguranca.png' },
    { postTitle: 'Cloud', imagem: 'artigo-05-cloud.png' },
    { postTitle: 'Carreira', imagem: 'artigo-06-carreira.png' },
    { postTitle: 'Certificacoes', imagem: 'artigo-07-certificacoes.png' },
    { postTitle: 'SailPoint', imagem: 'artigo-08-governanca.png' },
    { postTitle: 'Entra ID', imagem: 'artigo-09-azure.png' },
    { postTitle: 'Okta', imagem: 'artigo-10-okta.png' },
    { postTitle: 'Active Directory', imagem: 'artigo-11-ad.png' }
];

async function getAccessToken() {
    const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            refresh_token: REFRESH_TOKEN,
            grant_type: 'refresh_token'
        })
    });
    const data = await response.json();
    return data.access_token;
}

async function listPosts(accessToken) {
    const response = await fetch(
        `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?maxResults=50`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const data = await response.json();
    return data.items || [];
}

async function updatePost(accessToken, postId, content) {
    const response = await fetch(
        `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/${postId}`,
        {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        }
    );
    return response.json();
}

async function main() {
    console.log('=== UNIVERSO IAM - Atualizar Posts com Imagens ===\n');
    
    // Obter token
    console.log('Obtendo token de acesso...');
    const accessToken = await getAccessToken();
    console.log('Token obtido!\n');
    
    // Listar posts
    console.log('Listando posts do blog...');
    const posts = await listPosts(accessToken);
    console.log(`Encontrados ${posts.length} posts\n`);
    
    // Para cada post, verificar se tem imagem correspondente
    for (const post of posts) {
        const postTitle = post.title;
        console.log(`Post: ${postTitle}`);
        
        // Encontrar imagem correspondente
        const match = mapeamento.find(m => postTitle.includes(m.postTitle));
        
        if (match) {
            const imagePath = path.join(imagensDir, match.imagem);
            
            if (fs.existsSync(imagePath)) {
                // Converter imagem para base64
                const imageBuffer = fs.readFileSync(imagePath);
                const base64Image = imageBuffer.toString('base64');
                
                // Criar tag de imagem para o Blogger
                const imageTag = `<div style="text-align:center; margin: 20px 0;"><img src="data:image/png;base64,${base64Image}" style="max-width:100%; border-radius:12px; border:1px solid #30363d;" alt="${postTitle}"/></div>`;
                
                // Verificar se ja tem imagem
                if (!post.content.includes('data:image/png;base64,')) {
                    // Adicionar imagem no inicio do conteudo
                    const newContent = imageTag + post.content;
                    
                    // Atualizar post
                    console.log(`  Adicionando imagem: ${match.imagem}`);
                    await updatePost(accessToken, post.id, newContent);
                    console.log(`  [OK] Post atualizado!\n`);
                } else {
                    console.log(`  [SKIP] Post ja possui imagem\n`);
                }
            } else {
                console.log(`  [ERRO] Imagem nao encontrada: ${match.imagem}\n`);
            }
        } else {
            console.log(`  [SKIP] Nenhuma imagem mapeada\n`);
        }
        
        // Delay para evitar rate limiting
        await new Promise(r => setTimeout(r, 1000));
    }
    
    console.log('\n=== Concluido! ===');
}

main().catch(console.error);
