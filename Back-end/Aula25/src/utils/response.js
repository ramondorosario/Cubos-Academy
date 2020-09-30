/** Formata a mensagem do erro */
const imprimir = (ctx, status, mensagem, acao, resultado) => {
	ctx.status = status;
	ctx.body = {
		status: status >= 200 && status <= 399 ? 'sucesso' : 'erro',
		dados: {
			mensagem,
			[acao]: resultado,
		},
	};
};

module.exports = imprimir;
