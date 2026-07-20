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

async function main() {
    console.log('=== Atualizando Template do Blogger ===\n');
    
    const accessToken = await getAccessToken();
    console.log('Token obtido!\n');
    
    console.log('Obtendo template atual...');
    let template = await getTemplate(accessToken);
    console.log(`Template obtido! (${template.length} chars)\n`);
    
    // Verificar se ja tem thumbnail
    if (template.includes('data:post.thumbnailUrl')) {
        console.log('Template ja possui suporte a thumbnails!');
        return;
    }
    
    // Adicionar thumbnail no template
    console.log('Adicionando suporte a thumbnails...');
    
    // Procurar por ti-post-body e adicionar thumbnail antes
    const thumbnailCode = `
<b:if cond='data:post.thumbnailUrl'>
<img class='ti-post-thumb-sm' expr:alt='data:post.title' expr:src='data:post.thumbnailUrl'/>
</b:if>`;
    
    // Adicionar antes de ti-post-body
    if (template.includes("class='ti-post-body'")) {
        template = template.replace(
            /<div class='ti-post-body'>/g,
            `<div class='ti-post-flex'>${thumbnailCode}\n<div class='ti-post-body'>`
        );
        console.log('Thumbnail adicionado antes de ti-post-body');
    } else if (template.includes("class=\"ti-post-body\"")) {
        template = template.replace(
            /<div class="ti-post-body">/g,
            `<div class="ti-post-flex'>${thumbnailCode}\n<div class="ti-post-body">`
        );
        console.log('Thumbnail adicionado antes de ti-post-body');
    } else {
        console.log('Padrao ti-post-body nao encontrado');
        console.log('Procurando outros padroes...');
        
        // Tentar adicionar antes de data:post.snippet
        if (template.includes('data:post.snippet')) {
            template = template.replace(
                /<data:post\.snippet\/>/g,
                `${thumbnailCode}\n<data:post.snippet/>`
            );
            console.log('Thumbnail adicionado antes de data:post.snippet');
        }
    }
    
    // Enviar template atualizado
    console.log('\nEnviando template atualizado...');
    const result = await updateTemplate(accessToken, template);
    
    if (result.kind) {
        console.log('[OK] Template atualizado com sucesso!');
    } else {
        console.log('Resultado:', JSON.stringify(result, null, 2));
    }
    
    console.log('\n=== Concluido! ===');
}

main().catch(console.error);
