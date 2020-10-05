const imprimir = require('../utils/response');
const posts = require('../repositories/posts');

/** Exibe um post */
const exibirPosts = async (ctx) => {
	const listaPosts = await posts.obterPosts();
	const { autor = null } = ctx.query;

	if (!autor) {
		return imprimir(ctx, 200, 'post encontrado', 'post', listaPosts);
	}

	let postsAutor = listaPosts.filter(
		(x) => x.autor.split(' ').join('') === autor.split(' ').join('')
	);

	if (!postsAutor.length) return imprimir(ctx, 404, 'autor não encontrado');

	postsAutor = postsAutor.filter((x) => !x.deletado);

	return imprimir(ctx, 200, 'posts encontrado', 'posts', postsAutor);
};
module.exports = exibirPosts;
