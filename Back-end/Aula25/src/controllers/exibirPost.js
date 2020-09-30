const imprimir = require('../utils/response');
const { posts } = require('./criarPost');
const { autores } = require('./criarAutor');

/** Exibe um post */
const exibirPost = (ctx) => {
	const { id } = ctx.params;
	const indicePost = posts.findIndex((x) => x.id === id);
	if (indicePost !== -1) {
		if (!posts[indicePost].deletado) {
			const idAutor = posts[indicePost].autor;
			const autor = autores.find((x) => x.id === idAutor);
			const post = posts[indicePost];

			if (!autor.deletado) {
				ctx.status = 200;
				imprimir(ctx, 200, 'post criado', 'post', post);
			} else {
				imprimir(ctx, 404, 'o post foi removido');
			}
		} else {
			imprimir(ctx, 404, 'o post foi removido');
		}
	} else {
		imprimir(ctx, 404, 'post não encontrado');
	}
};
module.exports = exibirPost;
