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
module.exports = { criarPost, posts };
