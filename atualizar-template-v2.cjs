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

async function getTemplate(accessToken) {
    const response = await fetch(
        `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/templates/default`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    
    // Ler como texto
    const text = await response.text();
    
    // Tentar parsear como JSON
    try {
        const data = JSON.parse(text);
        return data.templateContent;
    } catch (e) {
        // Se nao for JSON, retorna o texto (pode ser o template HTML direto)
        console.log('Resposta nao e JSON, usando como template HTML');
        return text;
    }
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
    
    const text = await response.text();
    try {
        return JSON.parse(text);
    } catch (e) {
        return { raw: text };
    }
}

function addThumbnailSupport(template) {
    // Adicionar logica de thumbnail no loop de posts
    // Procurar por <data:post.snippet/> e adicionar thumbnail antes
    
    const thumbnailLogic = `
<b:if cond='data:post.thumbnailUrl'>
<img class='ti-post-thumb-sm' expr:alt='data:post.title' expr:src='data:post.thumbnailUrl'/>
</b:if>`;
    
    // Verificar se ja tem thumbnail logic
    if (!template.includes('data:post.thumbnailUrl')) {
        // Procurar pelo padrao do post body
        template = template.replace(
            /<div class='ti-post-body'>/g,
            `<div class='ti-post-flex'>\n${thumbnailLogic}\n<div class='ti-post-body'>`
        );
        
        // Adicionar fechamento da div flex se necessario
        if (!template.includes('</div>\n</div>\n</div>\n</article>')) {
            template = template.replace(
                /<a class='ti-readmore'/g,
                `</div>\n<a class='ti-readmore'`
            );
        }
    }
    
    return template;
}

async function main() {
    console.log('=== Atualizando Template do Blogger ===\n');
    
    const accessToken = await getAccessToken();
    console.log('Token obtido!\n');
    
    console.log('Obtendo template atual...');
    let template = await getTemplate(accessToken);
    
    if (template && template.length > 100) {
        console.log(`Template obtido! (${template.length} chars)\n`);
        
        // Salvar backup
        fs.writeFileSync('template-backup.html', template, 'utf8');
        console.log('Backup salvo em template-backup.html\n');
        
        // Atualizar template
        console.log('Adicionando suporte a thumbnails...');
        const updatedTemplate = addThumbnailSupport(template);
        
        // Salvar novo template
        fs.writeFileSync('template-atualizado.html', updatedTemplate, 'utf8');
        console.log('Template atualizado salvo\n');
        
        // Enviar para Blogger
        console.log('Enviando para Blogger...');
        const result = await updateTemplate(accessToken, updatedTemplate);
        
        if (result.kind || result.raw) {
            console.log('[OK] Template atualizado!\n');
        } else {
            console.log('Resultado:', JSON.stringify(result, null, 2));
        }
    } else {
        console.log('Erro ao obter template');
        console.log('Template recebido:', template?.substring(0, 200));
    }
    
    console.log('=== Concluido! ===');
}

main().catch(console.error);
