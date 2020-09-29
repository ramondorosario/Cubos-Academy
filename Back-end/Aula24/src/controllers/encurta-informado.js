const { formatarSucesso } = require('../utils/code');
const { formatarErro } = require('../utils/code');

const { verificarUrl } = require('../utils/code');

const { linksFormatados } = require('./encurta');

/** Verifica se existe o link encurtado */
const verificarEncurtador = (id) => {
	let indice = null;
	if (id === undefined || id === '')
		return formatarErro(ctx, 404, 'encurtado não informado');
	linksFormatados.forEach((x, i) => {
		if (x.codigo === id) {
			indice = i;
		}
	});
	return indice;
};

/** Gera um link encurtado através do encurta informado pelo usuário */
const encurtaInformado = (ctx) => {
	const idInformada = ctx.params.id;
	const id = verificarEncurtador(idInformada);
	const urlInformada = verificarUrl(ctx);

	if (id === null) {
		linksFormatados.push({
			url_original: ctx.request.body.url,
			codigo: idInformada,
		});

		if (urlInformada) {
			formatarSucesso(ctx, 201, {
				mensagem: 'link encurtado criado',
				url_original: ctx.request.body.url,
				url_encurtada: `localhost:8081/${idInformada}`,
			});
		} else formatarErro(ctx, 400, 'requisição mal formatada');
	} else formatarErro(ctx, 401, 'encurtado já utilizado');
};
module.exports = encurtaInformado;
