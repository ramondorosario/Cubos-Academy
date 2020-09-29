/** Formata Sucesso ou Erro */
const imprimir = (ctx, status, mensagem, acao, resultado) => {
    ctx.status = status;
    ctx.body = {
        status: status >= 200 && status <= 399 ? 'sucesso' : 'erro',
        dados: {
            mensagem: mensagem,
            [acao]: resultado
        }
    }
}
module.exports = imprimir;