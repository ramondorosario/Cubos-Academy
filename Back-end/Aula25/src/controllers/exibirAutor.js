const imprimir = require('../utils/response');
const autores = require('../repositories/autores');

/** Exibe um autor através da id escolhida na criação */
const exibirAutor = async (ctx) => {
	const { id = null } = ctx.params;
	if (!id) imprimir(ctx, 400, 'requisição mal formatada');

	const autor = await autores.obterAutor(id);

	if (!autor) return imprimir(ctx, 404, 'autor não encontrado');

	return imprimir(ctx, 200, 'autor econtrado', 'autor', autor);
};

module.exports = exibirAutor;
