const imprimir = require('../utils/response');
const posts = require('../repositories/posts');
const autores = require('../repositories/autores');

/** Cria um post com base em um autor */
const criarPost = async (ctx) => {
	const {
		titulo = null,
		subtitulo = null,
		idAutor = null,
		publicado = null,
	} = ctx.request.body;

	if (!titulo || !subtitulo || !idAutor || !publicado)
		return imprimir(ctx, 400, 'requisição mal formatada');

	const autor = await autores.obterAutor(idAutor);
	if (!autor) return imprimir(ctx, 404, 'autor não encontrado');
	if (autor.deletado) return imprimir(ctx, 401, 'autor foi removido');

	const conteudo = ctx.request.body;
	conteudo.autor = `${autor.primeiro_nome} ${autor.ultimo_nome}`;

	const resultado = await posts.criarPost(conteudo);
	return imprimir(ctx, 201, 'post criado', 'post', resultado);
};

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

/** Exibe todos os posts ou posts de um autor em particular */
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
module.exports = {
	criarPost,
	atualizarPost,
	exibirPost,
	exibirPosts,
	deletarPost,
};
