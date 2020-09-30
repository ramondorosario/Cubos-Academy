const imprimir = require('../utils/response');
const autores = require('./criarAutor').autores;

/** Exibe um autor através da id escolhida na criação */
const exibirAutor = (ctx) => {
	const { id } = ctx.params;
	const indiceAutor = autores.findIndex((x) => x.id === id);
	if (indiceAutor !== -1) {
		imprimir(ctx, 200, 'autor encontrado', 'autor', autores[indiceAutor]);
		return;
	}
	imprimir(ctx, 404, 'autor não encontrado');
};

module.exports = exibirAutor;
