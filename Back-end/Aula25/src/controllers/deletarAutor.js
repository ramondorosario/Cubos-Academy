const imprimir = require('../utils/response');
const autores = require('./criarAutor').autores;
const { posts } = require('./criarPost');

/** Deleta um autor através do id informado */
const deletarAutor = (ctx) => {
	const { id } = ctx.params;
	const indiceAutor = autores.findIndex((x) => x.id === id);

	if (indiceAutor !== -1) {
		if (autores[indiceAutor].deletado) {
			return imprimir(ctx, 401, 'autor já se encontra deletado');
		}
		autores[indiceAutor].deletado = true;
		const autor = autores[indiceAutor];

		const postAutor = posts.filter((x) => x.autor === autor.id);
		postAutor.forEach((x, i) => {
			if (!x.deletado) {
				posts[i].deletado = true;
			}
		});

		return imprimir(ctx, 200, 'autor deletado', 'autor', autor);
	}
	return imprimir(ctx, 404, 'autor não encontrado');
};
module.exports = deletarAutor;
