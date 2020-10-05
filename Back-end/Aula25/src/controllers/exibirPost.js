const imprimir = require('../utils/response');
const posts = require('../repositories/posts');

/** Exibe um post */
const exibirPost = async (ctx) => {
	const { id } = ctx.params;
	if (!id) imprimir(ctx, '400', 'requisição mal formatada');

	const post = await posts.obterPost(id);

	if (post) {
		if (!post.deletado) {
			return imprimir(ctx, 200, 'post encontrado', 'post', post);
		}
		return imprimir(ctx, 401, 'post foi removido');
	}
	return imprimir(ctx, 404, 'post não encontrado');
};
module.exports = exibirPost;
