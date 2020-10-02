const biblioteca = require('../repositories/biblioteca');

const obterLivros = async (ctx) => {
	await biblioteca.criarBiblioteca();

	const livros = await biblioteca.obterLivros();
	const { autor = null, deletado = false } = ctx.query;

	const estado = deletado === 'true';

	if (!autor) {
		ctx.body = livros.filter((livro) => livro.deletado === estado);
		return;
	}

	ctx.body = livros.filter(
		(livro) => livro.deletado === estado && livro.autor === autor
	);
};

const obterLivro = async (ctx) => {
	await biblioteca.criarBiblioteca();
	const livros = await biblioteca.obterLivros();
	const { id = null } = ctx.params;

	if (!id) {
		ctx.status = 400;
		ctx.body = { mensagem: 'Pedido mal formatado' };
	}
	const livro = livros.find((item) => item.id === Number(id));

	if (livro) {
		ctx.body = { livro };
		return;
	}

	ctx.status = 404;
	ctx.body = { livro: 'livro não encontrado' };
};

const adicionarLivro = async (ctx) => {
	await biblioteca.criarBiblioteca();

	const { titulo = null, autor = null } = ctx.request.body;
	if (!titulo || !autor) {
		ctx.status = 400;
		ctx.body = 'erro';
		return;
	}

	const novoLivro = { titulo, autor, deletado: false };
	await biblioteca.adicionarLivro(novoLivro);

	ctx.status = 201;
	ctx.body = novoLivro;
};

module.exports = { obterLivros, obterLivro, adicionarLivro };
