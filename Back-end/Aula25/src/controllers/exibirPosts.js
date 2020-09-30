const { posts } = require('./criarPost');
const imprimir = require('../utils/response');
const { autores } = require('./criarAutor');

/** Exibe todos os posts */
const exibirPosts = (ctx) => {
	const { autor = null } = ctx.query;
	if (autor) {
		const postsAutor = posts.filter(
			(x) => x.autor === autor && !x.deletado
		);
		const dadosAutor = autores.find((x) => x.id === autor);
		if (!dadosAutor) return imprimir(ctx, 404, 'autor não encontrado');
		const { primeiro_nome: nome, ultimo_nome: sobrenome } = dadosAutor;
		imprimir(
			ctx,
			200,
			`posts do autor ${nome} ${sobrenome} encontrado`,
			'posts',
			postsAutor
		);
	}
	return imprimir(ctx, 200, 'lista de posts encontrada', 'posts', posts);
};

module.exports = exibirPosts;
