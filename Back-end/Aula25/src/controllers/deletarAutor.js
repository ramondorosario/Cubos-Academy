const imprimir = require('../utils/response');
const autores = require('../repositories/autores');
const posts = require('../repositories/posts');

/** Deleta um autor através do id informado */
const deletarAutor = async (ctx) => {
	const { id = null } = ctx.params;

	if (id) {
		const autor = await autores.obterAutor(id);

		if (autor) {
			if (autor.deletado) {
				return imprimir(ctx, 401, 'autor já se encontra deletado');
			}
			const resultado = await autores.deletarAutor(id);

			await posts.deletarPostsAutor(autor.id);
			return imprimir(ctx, 200, 'autor deletado', 'autor', resultado);
		}
	}
	return imprimir(ctx, 404, 'autor não encontrado');
};

module.exports = deletarAutor;
