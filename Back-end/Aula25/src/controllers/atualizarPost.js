const posts = require('../repositories/posts');
const imprimir = require('../utils/response');

/** Atualizar um post */
const atualizarPost = async (ctx) => {
	const { id = null } = ctx.params;

	const post = await posts.obterPost(id);
	const conteudo = ctx.request.body;

	if (!id) imprimir(ctx, 400, 'requisição mal formatada');
	if (post) {
		if (!post.deletado) {
			// Se o post não estiver deletado, poderá sofrer atualização
			if (conteudo.id !== undefined || conteudo.deletado !== undefined) {
				// propriedade id e deletado, não pode ser modificado
				imprimir(ctx, 401, 'Id ou Deletado não pode sofrer alteração');
				return;
			}
			if (conteudo.titulo !== undefined) {
				await posts.atualizarPost(id, 'titulo', conteudo.titulo);
			}
			if (conteudo.subtitulo !== undefined) {
				await posts.atualizarPost(id, 'subtitulo', conteudo.subtitulo);
			}
			if (conteudo.publicado !== undefined) {
				await posts.atualizarPost(id, 'publicado', conteudo.publicado);
			}
			const postAtualizado = await posts.obterPost(id);
			imprimir(ctx, 200, 'post atualizado', 'post', postAtualizado);
		} else imprimir(ctx, 401, 'o post foi deletado');
	} else {
		imprimir(ctx, 404, 'post não encontrado');
	}
};
module.exports = atualizarPost;
