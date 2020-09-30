const imprimir = require('../utils/response');
const { posts } = require('./criarPost');

/** Deleta um post */
const deletarPost = (ctx) => {
	const { id } = ctx.params;
	const indicePost = posts.findIndex((x) => x.id === id);

	if (indicePost !== -1) {
		const post = posts[indicePost];
		if (post.deletado) {
			return imprimir(ctx, 403, 'post já se encontra deletado');
		}
		post.deletado = true;
		return imprimir(ctx, 200, 'post deletado', 'post', posts[indicePost]);
	}
	return imprimir(ctx, 404, 'post não encontrado');
};
module.exports = deletarPost;
