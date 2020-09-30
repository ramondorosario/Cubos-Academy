const { posts } = require('./criarPost');
const imprimir = require('../utils/response');

/** Atualizar um post */
const atualizarPost = (ctx) => {
	const { id } = ctx.params;
	const indicePost = posts.findIndex((x) => x.id === id);
	const conteudo = ctx.request.body;

	if (indicePost !== -1) {
		if (!posts[indicePost].deletado) {
			// Se o post não estiver deletado, poderá sofrer atualização
			if (conteudo.id !== undefined || conteudo.deletado !== undefined) {
				// propriedade id e deletado, não pode ser modificado
				imprimir(ctx, 401, 'Id ou Deletado não pode sofrer alteração');
				return;
			}
			if (conteudo.titulo !== undefined) {
				posts[indicePost].titulo = conteudo.titulo;
			}
			if (conteudo.subtitulo !== undefined) {
				posts[indicePost].subtitulo = conteudo.subtitulo;
			}
			if (conteudo.publicado !== undefined) {
				posts[indicePost].publicado = conteudo.publicado;
			}
			const post = posts[indicePost];
			imprimir(ctx, 200, 'post atualizado com sucesso', 'post', post);
		} else imprimir(ctx, 401, 'o post foi deletado');
	} else {
		imprimir(ctx, 404, 'post não encontrado');
	}
};
module.exports = atualizarPost;
