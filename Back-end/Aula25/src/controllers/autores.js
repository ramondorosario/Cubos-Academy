/* eslint-disable camelcase */
const imprimir = require('../utils/response');
const autores = require('../repositories/autores');
const posts = require('../repositories/posts');

/** Cria um autor */
const criarAutor = async (ctx) => {
	const listaAutores = await autores.obterAutores();
	const { hash } = ctx.state;

	const {
		primeiro_nome = null,
		ultimo_nome = null,
		email = null,
	} = ctx.request.body;

	if (!primeiro_nome || !ultimo_nome || !email)
		return imprimir(ctx, 400, 'requisição mal formatada');

	const autorEncontrado = listaAutores.filter(
		(a) => a.email === email && !a.deletado
	);
	if (autorEncontrado[0])
		return imprimir(
			ctx,
			401,
			'já existe um autor cadastrado com o email informado'
		);

	const autor = {
		primeiro_nome,
		ultimo_nome,
		email,
		senha: hash,
	};

	const autorCriado = await autores.criarAutor(autor);
	return imprimir(ctx, 201, 'autor criado', 'autor', autorCriado);
};

/** Atualiza os dados de um autor */
const atualizarAutor = async (ctx) => {
	const { id } = ctx.params;
	let autor = await autores.obterAutor(id);

	const novasInformacoes = ctx.request.body;

	if (autor) {
		if (!autor.deletado) {
			// Se o autor não estiver deletado, poderá sofrer atualização
			if (
				novasInformacoes.id !== undefined ||
				novasInformacoes.deletado !== undefined
			) {
				// propriedade id e deletado, não pode ser modificado
				imprimir(ctx, 401, 'Id ou Deletado não pode sofrer alteração');
				return;
			}
			if (novasInformacoes.email !== undefined) {
				await autores.atualizarAutor(
					id,
					'email',
					novasInformacoes.email
				);
			}
			if (novasInformacoes.senha !== undefined) {
				await autores.atualizarAutor(
					id,
					'senha',
					novasInformacoes.senha
				);
			}
			if (novasInformacoes.primeiro_nome !== undefined) {
				await autores.atualizarAutor(
					id,
					'primeiro_nome',
					novasInformacoes.primeiro_nome
				);
			}
			if (novasInformacoes.ultimo_nome !== undefined) {
				await autores.atualizarAutor(
					id,
					'ultimo_nome',
					novasInformacoes.ultimo_nome
				);
			}

			autor = await autores.obterAutor(id);
			imprimir(ctx, 200, 'autor atualizado', 'autor', autor);
		} else imprimir(ctx, 401, 'autor foi deletado');
	} else {
		imprimir(ctx, 404, 'autor não encontrado');
	}
};

/** Exibe um autor através da id escolhida na criação */
const exibirAutor = async (ctx) => {
	const { id = null } = ctx.params;
	if (!id) imprimir(ctx, 400, 'requisição mal formatada');

	const autor = await autores.obterAutor(id);

	if (!autor) return imprimir(ctx, 404, 'autor não encontrado');

	return imprimir(ctx, 200, 'autor econtrado', 'autor', autor);
};

/** Exibe todos os autores */
const exibirAutores = async (ctx) => {
	let listaAutores = await autores.obterAutores();

	listaAutores = listaAutores.filter((x) => !x.deletado);

	imprimir(ctx, 200, 'autores encontrados', 'autores', listaAutores);
};

/** Deleta um autor através do id informado */
const deletarAutor = async (ctx) => {
	const { id = null } = ctx.params;

	if (id) {
		const autor = await autores.obterAutor(id);

		if (autor) {
			if (autor.deletado) {
				return imprimir(ctx, 401, 'autor já se encontra deletado');
			}
			const resultado = await autores.deletarAutor(id);

			await posts.deletarPostsAutor(autor.id);
			return imprimir(ctx, 200, 'autor deletado', 'autor', resultado);
		}
	}
	return imprimir(ctx, 404, 'autor não encontrado');
};

module.exports = {
	criarAutor,
	atualizarAutor,
	exibirAutor,
	exibirAutores,
	deletarAutor,
};
