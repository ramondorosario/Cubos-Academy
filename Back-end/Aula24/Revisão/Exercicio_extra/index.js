const koa = require('koa');
const server = new koa ();
const bodyParser = require('koa-bodyparser');

server.use(bodyParser());

const autores = [];

/** Formata a mensagem do erro */
const formatarErro = (ctx, idErro, mensagem) => {
    ctx.status = idErro;
    ctx.body = {
        status: 'erro',
        dados: mensagem
    }
}

/** Formata a mensagem de sucesso */
const formatarSucesso = (ctx, idSucesso, mensagem) => {
    ctx.status = idSucesso;
    ctx.body = {
        status: 'sucesso',
        dados: mensagem
    }
}

/** Encontra um elemento específico em um array */
const encontrar = (origem, id) => {
    let resultado = false, indice; 
    origem.forEach((item, i) => {
        if (item.id == id) {
            resultado = true;
            indice = i;
        }
    })
    // O retorno sempre vai ser um array dizendo se existe o elemento buscado e qual a posição que ele se encontra
    return resposta = [resultado, indice];
}
//----------------------Autor------------------------//
/** Cria um autor */
const criarAutor = (ctx) => {
    const informacoes = ctx.request.body; 
    const newId = informacoes.id;
    const resposta = encontrar(autores, newId);
    
    if (!resposta[0]) {
        if (informacoes != '') {
            autores.push(informacoes);
            formatarSucesso(ctx, 201, 'autor criado com sucesso')
        } else {
            formatarErro(ctx, 400, 'autor mal formatado')
        }
    } else {
        formatarErro(ctx, 403, 'já existe um autor com o id informado')
    }
}

/** Exibe um autor através da id escolhida na criação */
const exibirAutor = (ctx) => {
    const id = ctx.url.split('/')[2];
    const resposta = encontrar(autores, id);
    const indiceAutor = resposta[1];
    if (resposta[0]) {
        const mensagem = autores[indiceAutor];
        formatarSucesso(ctx, 200, mensagem);
        return;
    }
    formatarErro(ctx, 404, 'não encontrado')
}

/** Deleta um autor através do id informado */
const deletarAutor = (ctx) => {
    const id = ctx.url.split('/')[2];
    const resposta = encontrar(autores, id);
    const indiceAutor = resposta[1]
    if (resposta[0]) {
        if(autores[indiceAutor].deletado === true) {
            return formatarErro(ctx, 403, 'autor já se encontra deletado')
        } else {
            autores[indiceAutor].deletado = true;
            posts.forEach((item, i) => {//Verifica se o autor tem algum post. Se sim, será deletado          
                if (item.autor == autores[indiceAutor].id) {
                    posts[i].deletado = true;
                }
            })
            formatarSucesso(ctx, 200, 'autor deletado como sucesso');
            return;
        }
    }
    formatarErro(ctx, 404, 'não encontrado');
}

/** Atualiza um autor */
const atualizarAutor = (ctx) => {
    const id = ctx.url.split('/')[2];
    const resposta = encontrar(autores, id);
    const indiceAutor = resposta[1];
    const novasInformacoes = ctx.request.body;

    if (resposta[0]) {
        if (autores[indiceAutor].deletado === false) {//Se o autor não estiver deletado, poderá sofrer atualização
            if (novasInformacoes.id != undefined || novasInformacoes.deletado != undefined) {//propriedade id e deletado, não pode ser modificado
                formatarErro(ctx, 403, 'Id ou Deletado não pode sofrer alteração');
                return;
            }
            if (novasInformacoes.email != undefined) {
                autores[indiceAutor].email = novasInformacoes.email;
            }
            if (novasInformacoes.senha != undefined) {
                autores[indiceAutor].senha = novasInformacoes.senha;
            }
            if (novasInformacoes.primeiro_nome != undefined) {
                autores[indiceAutor].primeiro_nome = novasInformacoes.primeiro_nome;
            }
            formatarSucesso(ctx, 200, 'autor atualizado com sucesso')
        }
    } else {
        formatarErro(ctx, 404, 'não encontrado')
    }    
}

//-------------------------POST------------------------//
const posts = [];
/** Cria um post com base em um autor */
const criarPost = (ctx) => {
    const jaExiste = [];
    posts.filter(item => {
        if (item.id == ctx.request.body.id) {
            jaExiste.push(item)
        }
    })

    if (jaExiste.length === 0) {
        const autor = ctx.request.body.autor;
        const respostaAutor = encontrar(autores, autor);
        const indiceAutor = respostaAutor[1];
    
        if (respostaAutor[0]) {
            if (!autores[indiceAutor].deletado) {
                posts.push(ctx.request.body);
                formatarSucesso(ctx, 201, 'post criado com sucesso');
            } else {
                formatarErro(ctx, 403, 'o autor foi removido')
            }
        } else {
            formatarErro(ctx, 404, 'autor não encontrado')
        }
    } else {
        formatarErro(ctx, 403, 'já existe um post com a id informada')
    }    
}

/** Exibe um post */
const exibirPost = (ctx) => {
    const id = ctx.url.split('/')[2];
    const respostaPost = encontrar(posts, id);
    const indicePost = resposta[1];
    if (respostaPost[0]) {        
        if (!posts[indicePost].deletado) {
            const idAutor = posts[indicePost].autor;
            const respostaAutor = encontrar(autores, idAutor);
            const indiceAutor = respostaAutor[1];
    
            if(!autores[indiceAutor].deletado) {
                ctx.status = 200;
                formatarSucesso(ctx, 200, posts[indicePost]);
            } else {
                formatarErro(ctx, 404, 'o post foi removido após o autor ser deletado')
            }       
        } else {
            formatarErro(ctx, 404, 'o post foi removido')
        }    
    } else {
        formatarErro(ctx, 404, 'post removido ou não encontrado');
    }
}

/** Exibe todos os posts */
const exibirPosts = (ctx) => {
    formatarSucesso(ctx, 200, posts);
}

/** Atualizar um post */
const atualizarPost = (ctx) => {
    const id = ctx.url.split('/')[2];
    const respostaPost = encontrar(posts, id);
    const indicePost = resposta[1];
    const novasInformacoes = ctx.request.body;

    if (respostaPost[0]) {
        if (posts[indicePost].deletado === false) {//Se o post não estiver deletado, poderá sofrer atualização
            if (novasInformacoes.id != undefined || novasInformacoes.deletado != undefined) {//propriedade id e deletado, não pode ser modificado
                formatarErro(ctx, 403, 'Id ou Deletado não pode sofrer alteração');
                return;
            }
            if (novasInformacoes.titulo != undefined) {
                posts[indicePost].titulo = novasInformacoes.titulo;
            }
            if (novasInformacoes.subtitulo != undefined) {
                posts[indicePost].subtitulo = novasInformacoes.subtitulo;
            }
            if (novasInformacoes.publicado != undefined) {
                posts[indicePost].publicado = novasInformacoes.publicado;
            }
            formatarSucesso(ctx, 200, 'post atualizado com sucesso')
        }
    } else {
        formatarErro(ctx, 404, 'post não encontrado')
    }
}

/** Deleta um post */
const deletarPost = (ctx) => {
    const id = ctx.url.split('/')[2];
    const resposta = encontrar(posts, id);
    const indicePost = resposta[1];

    if (resposta[0]) {
        if(posts[indicePost].deletado === true) {
            return formatarErro(ctx, 403, 'post já se encontra deletado')
        } else {
            formatarSucesso(ctx, 200, 'post deletado como sucesso');
            return;
        }
    }
    formatarErro(ctx, 404, 'post não encontrado');
}

/** Exibe todos os posts de um autor específico */
const exibirPostsAutor = (ctx) => {
    console.log('entrei no posts autor')
    const id = ctx.url.split('=')[1];
    console.log(id)
    const respostaAutor = encontrar(autores, id);
    const indiceAutor = respostaAutor[1];

    if (resposta[0] && autores[indiceAutor].deletado === false) {
        const resultado = [];
        posts.forEach(item => {
            if (item.autor == id) {
                resultado.push(item)
            }
        })

        ctx.status = 200;
        ctx.body = {
            status: 'sucesso',
            dados: resultado
        }
    } else {
        formatarErro (ctx, 404, 'autor não encontrado')
    }
}

server.use((ctx) => {
    if (ctx.method === 'POST') {
        if (ctx.url === '/autor') {
            criarAutor(ctx);
        } else if (ctx.url.includes('/posts')) {
            criarPost(ctx);
        } else {
            formatarErro(ctx, 404, "não encontrado")
        }
    } else if (ctx.method === 'GET') {
        if (ctx.url.includes('/autor/')) {
            exibirAutor(ctx);
        } else if (ctx.url.includes('/posts/')) {            
            exibirPost(ctx);
        } else if (ctx.url == '/posts') {
            exibirPosts(ctx);
        } else if (ctx.url.includes('posts?autor=')) {
            exibirPostsAutor(ctx);
        } else {
            formatarErro(ctx, 404, 'não encontrado');
        }
    } else if (ctx.method === 'DELETE') {
        if (ctx.url.includes('/autor/')) {
            deletarAutor(ctx);
        } else {
            formatarErro(ctx, 404, 'não encontrado')
        }
    } else if (ctx.method === 'PUT') {
        if (ctx.url.includes('/autor/')) {
            atualizarAutor(ctx);
        } else if (ctx.url.includes('/posts/')) {
            atualizarPost(ctx);
        } else {
            formatarErro(ctx, 404, 'não encontrado')
        }
    } else {
        formatarErro(ctx, 405, "metodo não permitido")
    }
})

server.listen('8081', () => {
    console.log('Servidor rodando na porta 8081')
})