/** Formata a mensagem de sucesso */
const formatarSucesso = (ctx, ctxStatus, dados) => {
    ctx.status = ctxStatus;
    ctx.body = {
        status: 'sucesso',
        dados: dados
    };
}

/** Formata a mensagem de erro */
const formatarErro = (ctx, ctxStatus, mensagem) => {
    ctx.status = ctxStatus;
    ctx.body = {
        status: 'erro',
        dados: {
            mensagem: mensagem
        }
    }
}

/** Verifica se foi passado um corpo com a url no metodo post */
const verificarUrl = (ctx) => {
    const url = ctx.request.body.url;
    if (url != undefined && url !== '') {
        return true
    } else {
        return false;
    }
}
module.exports = { formatarSucesso, formatarErro, verificarUrl};