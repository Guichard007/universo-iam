const fs = require('fs');
const path = require('path');

// Configuracoes
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

async function getTemplate(accessToken) {
    const response = await fetch(
        `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/templates/default`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const data = await response.json();
    return data.templateContent;
}

async function updateTemplate(accessToken, templateContent) {
    const response = await fetch(
        `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/templates/default`,
        {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ templateContent })
        }
    );
    const data = await response.json();
    return data;
}

function addThumbnailsToTemplate(template) {
    // Adicionar CSS para thumbnails se nao existir
    const thumbCSS = `
.ti-post-thumb-sm { width: 150px; height: 100px; object-fit: cover; border-radius: 8px; flex-shrink: 0; border: 1px solid #30363d; }
`;
    
    if (!template.includes('.ti-post-thumb-sm')) {
        template = template.replace('/* Footer */', thumbCSS + '\n/* Footer */');
    }
    
    // Adicionar logica de thumbnail no template do Blogger
    // Procurar por ti-post-flex e adicionar thumbnail antes do ti-post-body
    const thumbnailCode = `<b:if cond='data:post.thumbnailUrl'>
<img class='ti-post-thumb-sm' expr:alt='data:post.title' expr:src='resizeImage(data:post.thumbnailUrl, 300, "300:150")'/>
</b:if>`;
    
    // Verificar se ja tem thumbnail
    if (!template.includes('ti-post-thumb-sm')) {
        // Procurar padrao do post
        template = template.replace(
            /<div class='ti-post-flex'>/g,
            `<div class='ti-post-flex'>\n${thumbnailCode}`
        );
    }
    
    return template;
}

async function main() {
    console.log('=== Atualizando Template do Blogger ===\n');
    
    // Obter token
    console.log('1. Obtendo token de acesso...');
    const accessToken = await getAccessToken();
    console.log('   Token obtido!\n');
    
    // Obter template atual
    console.log('2. Obtendo template atual...');
    let template = await getTemplate(accessToken);
    console.log('   Template obtido! (tamanho: ' + template.length + ' chars)\n');
    
    // Salvar backup
    fs.writeFileSync('template-backup.html', template, 'utf8');
    console.log('   Backup salvo em template-backup.html\n');
    
    // Atualizar template
    console.log('3. Adicionando suporte a thumbnails...');
    const updatedTemplate = addThumbnailsToTemplate(template);
    
    // Salvar novo template
    fs.writeFileSync('template-atualizado.html', updatedTemplate, 'utf8');
    console.log('   Template atualizado salvo\n');
    
    // Enviar para Blogger
    console.log('4. Enviando template para Blogger...');
    const result = await updateTemplate(accessToken, updatedTemplate);
    
    if (result.kind) {
        console.log('   [OK] Template atualizado com sucesso!\n');
    } else {
        console.log('   [ERRO] Falha ao atualizar template\n');
        console.log(JSON.stringify(result, null, 2));
    }
    
    console.log('=== Concluido! ===');
    console.log('Acesse: https://universoiam.blogspot.com/');
}

main().catch(console.error);
