const fs = require('fs');

const CLIENT_ID = "830209937533-8eikl8p09ljqsfm91t1ldbtrsqsscdk3.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const BLOG_ID = "1633190249834178763";
const REFRESH_TOKEN = "1//0hn1zW1AebzGwCgYIARAAGBESNwF-L9IrXrjLSH9HPCPyfbVnIQPR_4UcQFR_MUdx_xpIpw7r0R0PQjvWZ5wlR09q6zoFU_45N88";

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

async function getBlogInfo(accessToken) {
    const response = await fetch(
        `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return response.json();
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

function extractFirstImage(content) {
    // Extrair primeira imagem do conteudo
    const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);
    if (imgMatch) {
        return imgMatch[1];
    }
    return null;
}

function addThumbnailToContent(content, imageUrl) {
    // Adicionar thumbnail no inicio do conteudo
    const thumbnailHtml = `<div style="margin-bottom: 20px;"><img src="${imageUrl}" style="width: 100%; max-width: 800px; border-radius: 12px; border: 1px solid #30363d;" alt="Imagem do artigo"/></div>`;
    
    // Verificar se ja tem thumbnail no inicio
    if (!content.startsWith('<div style="margin-bottom: 20px;">')) {
        return thumbnailHtml + content;
    }
    return content;
}

async function main() {
    console.log('=== UNIVERSO IAM - Preparar Posts com Thumbnails ===\n');
    
    const accessToken = await getAccessToken();
    console.log('Token obtido!\n');
    
    const posts = await listPosts(accessToken);
    console.log(`Encontrados ${posts.length} posts\n`);
    
    for (const post of posts) {
        console.log(`Post: ${post.title}`);
        
        // Extrair primeira imagem
        const firstImage = extractFirstImage(post.content);
        
        if (firstImage) {
            console.log(`  Imagem encontrada: ${firstImage.substring(0, 80)}...`);
            
            // Verificar se ja tem thumbnail
            if (!post.content.startsWith('<div style="margin-bottom: 20px;">')) {
                // Adicionar thumbnail
                const newContent = addThumbnailToContent(post.content, firstImage);
                await updatePost(accessToken, post.id, newContent);
                console.log('  [OK] Thumbnail adicionado!\n');
            } else {
                console.log('  [SKIP] Ja tem thumbnail\n');
            }
        } else {
            console.log('  [AVISO] Nenhuma imagem encontrada no post\n');
        }
        
        await new Promise(r => setTimeout(r, 500));
    }
    
    console.log('=== Concluido! ===');
}

main().catch(console.error);
