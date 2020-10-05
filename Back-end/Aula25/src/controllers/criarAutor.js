/* eslint-disable camelcase */
const imprimir = require('../utils/response');
const autores = require('../repositories/autores');

/** Cria um autor */
const criarAutor = async (ctx) => {
	const listaAutores = await autores.obterAutores();

	const {
		primeiro_nome = null,
		ultimo_nome = null,
		email = null,
		senha = null,
	} = ctx.request.body;

	if (!primeiro_nome || !ultimo_nome || !email || !senha)
		return imprimir(ctx, 400, 'requisição mal formatada');

	const indice = listaAutores.filter(
		(a) =>
			a.primeiro_nome === primeiro_nome && a.ultimo_nome === ultimo_nome
	);
	if (indice[0])
		return imprimir(ctx, 401, 'já existe um autor com o nome informado');

	const autor = {
		primeiro_nome,
		ultimo_nome,
		email,
		senha,
	};

	const autorCriado = await autores.criarAutor(autor);
	return imprimir(ctx, 201, 'autor criado', 'autor', autorCriado);
};
module.exports = { criarAutor };
