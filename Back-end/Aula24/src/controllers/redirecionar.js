const { formatarSucesso } = require('../utils/code');
const { formatarErro } = require('../utils/code');

const { linksFormatados } = require('./encurta');

/** Verifica se existe o link encurtado */
const verificarEncurtador = (id) => {
	let indice = null;
	linksFormatados.forEach((x, i) => {
		if (x.codigo === id) {
			indice = i;
		}
	});
	return indice;
};

/** Redireciona o link encurtado para url original */
const redirecionar = (ctx) => {
	const codigo = ctx.params.id;
	if (codigo === undefined || codigo === '')
		return formatarErro(ctx, 404, 'encurtado não informado');
	const id = verificarEncurtador(codigo);

	if (id !== null) {
		ctx.status = 301;
		return ctx.redirect(linksFormatados[id].url_original);
	}
	return formatarErro(ctx, 404, 'encurtado não encontrado');
};
module.exports = redirecionar;
