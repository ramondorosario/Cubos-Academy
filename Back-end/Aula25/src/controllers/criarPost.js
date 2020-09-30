const imprimir = require('../utils/response');
const { autores } = require('./criarAutor');

const posts = [];
/** Cria um post com base em um autor */
const criarPost = (ctx) => {
	const jaExiste = posts.filter((item) => item.id === ctx.request.body.id);

	if (jaExiste.length === 0) {
		const { autor } = ctx.request.body;
		const indiceAutor = autores.findIndex((x) => x.id === autor);

		if (indiceAutor !== -1) {
			if (!autores[indiceAutor].deletado) {
				const post = ctx.request.body;
				posts.push(ctx.request.body);
				imprimir(ctx, 201, 'post criado', 'post', post);
			} else {
				imprimir(ctx, 401, 'o autor foi removido');
			}
		} else {
			imprimir(ctx, 404, 'autor não encontrado');
		}
	} else {
		imprimir(ctx, 401, 'já existe um post com a id informada');
	}
};
module.exports = { criarPost, posts };
