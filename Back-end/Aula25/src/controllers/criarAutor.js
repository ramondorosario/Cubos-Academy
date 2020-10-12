/* eslint-disable camelcase */
const imprimir = require('../utils/response');
const autores = require('../repositories/autores');

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
module.exports = { criarAutor };
