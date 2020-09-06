const koa = require('koa');
const bodyParser = require('koa-bodyparser');

const server = new koa();

server.use(bodyParser());

/**
 * Formata a mensagem de erro
 */
const formatarErro = (ctx, ctxStatus, mensagem) => {
    ctx.status = ctxStatus;
    ctx.body = dados = {
        status: 'erro',
        mensagem: mensagem
    }
}

/**
 * Verifica se foi passado um corpo com a url no metodo post
 */
const verificarUrl = (ctx) => {
    const url = ctx.request.body.url;
    if (url != undefined && url !== '') {
        return true
    } else {
        return false;
    }
}

const linksFormatados = [];
/**
 * Gera o codigo encurtado para ser utilizado no lugar do link completo
 */
const gerarCodigo = (ctx) => {
    const codigo = Math.random().toString(36).substr(2, 7);
    const url = ctx.request.body.url;
    linksFormatados.push(
        {
            url_original: url,
            codigo: codigo
        }
    );
    ctx.status = 201;
    ctx.body = {
        status: 'sucesso',
        dados: {
            url_original: url,
            url_encurtada: `localhost:8081/${codigo}`
        }
    }
}

/**
 * Adiciona o encurtador escolhido na lista de links
 */
const addEncurtadorEscolhido = (ctx, encurtadorEscolhido) => {
    const url = ctx.request.body.url;
    linksFormatados.push(
        {
            url_original: url,
            codigo: encurtadorEscolhido
        }
    );
    ctx.status = 201,
    ctx.body = {
        status: 'sucesso',
        dados: {
            url_original: url,
            url_encurtada: `localhost:8081/${encurtadorEscolhido}`
        }
    }
}

/**
 * Verifica se existe o link encurtado
 */
const verificarEncurtador = (id) => {
    let indice = null;
    linksFormatados.forEach((x, i) => {
        if (x.codigo === id) {
            indice = i;
        }
    })
    return indice
}

server.use((ctx) => {
    if (ctx.method === 'POST'){
        if (ctx.url.includes('/encurta/')) {
            const encurtadorEscolhido = ctx.url.split('/')[2];
            if (encurtadorEscolhido !== '') {
                if (verificarUrl(ctx)) {
                    const resposta = verificarEncurtador(encurtadorEscolhido);
                    if(resposta === null) {
                        addEncurtadorEscolhido(ctx, encurtadorEscolhido);
                    } else {
                        formatarErro(ctx, 401, 'Não autorizado. Encurtador escolhido já existe')
                    }
                } else {
                    formatarErro(ctx, 400, 'Requisição mal formatada')
                }
            } else {
                formatarErro(ctx, 401, 'Não foi feita a declaração do encurtador')
            }
        } else if (ctx.url.includes('/encurta')){            
            if (verificarUrl(ctx)) {
                const codigo = gerarCodigo(ctx);
            } else {
                formatarErro(ctx, 400, 'Requisição mal formatada')
            }            
        } else {
            formatarErro(ctx, 404, 'Não encontrado')
        }        
    } else if (ctx.method === 'GET') {
        if (ctx.url.includes('/')) {
            const id = ctx.url.split('/')[1];
            const indice = verificarEncurtador(id);
            if (indice != null) {
                ctx.status = 301;
                ctx.redirect(linksFormatados[indice].url_original);
            } else {
                formatarErro(ctx, 404, 'Não encontrado')
            }
        } else {
            formatarErro(ctx, 404, 'Nao encontrado')
        }            
    } else {
        formatarErro(ctx, 405, 'Metodo nao permitido')
    }
})

server.listen('8081', () => {
    console.log('Rodando na porta 8081');
})