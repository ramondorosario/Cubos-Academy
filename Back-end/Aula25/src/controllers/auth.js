const imprimir = require('../utils/response');
const { obterAutorPorEmail } = require('../repositories/autores');
const password = require('../utils/password');

const autenticar = async (ctx) => {
	const { email = null, senha = null } = ctx.request.body;

	if (!email || !senha) return imprimir(ctx, 400, 'requisição mal formatada');

	const resultado = await obterAutorPorEmail(email);
	if (!resultado) return imprimir(ctx, 400, 'email ou senha incorreto');

	const comparison = await password.check(senha, resultado.senha);
	if (!comparison) return imprimir(ctx, 400, 'senha inválida');

	return imprimir(ctx, 200, 'usuário autenticado');
};

module.exports = autenticar;
