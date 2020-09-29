const { formatarSucesso } = require('../utils/code');
const { formatarErro } = require('../utils/code');

const linksFormatados = [];
/** Gera o codigo encurtado para ser utilizado no lugar do link completo */
const gerarCodigo = (ctx) => {
	const codigo = Math.random().toString(36).substr(2, 7);
	const { url } = ctx.request.body;

	linksFormatados.push({ url_original: url, codigo });

	formatarSucesso(ctx, 201, {
		mensagem: 'link encurtado gerado',
		url_original: url,
		url_encurtada: `localhost:8081/${codigo}`,
	});
};

const { verificarUrl } = require('../utils/code');
/** Encurta uma url */
const encurta = (ctx) => {
	if (verificarUrl(ctx)) {
		const codigo = gerarCodigo(ctx);
	} else {
		formatarErro(ctx, 400, 'Requisição mal formatada');
	}
};

module.exports = { encurta, linksFormatados };
