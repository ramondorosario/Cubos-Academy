const imprimir = require('../utils/response');
const posts = require('../repositories/posts');

/** Deleta um post */
const deletarPost = async (ctx) => {
	const { id = null } = ctx.params;
	if (!id) imprimir(ctx, 400, 'requisição mal formatada');

	const post = await posts.obterPost(id);
	if (post) {
		if (post.deletado) {
			return imprimir(ctx, 401, 'post já se encontra deletado');
		}

		const deletado = await posts.deletarPost(id);
		return imprimir(ctx, 200, 'post deletado', 'post', deletado);
	}
	return imprimir(ctx, 404, 'post não encontrado');
};
module.exports = deletarPost;
