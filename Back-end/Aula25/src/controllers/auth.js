const Jwt = require('jsonwebtoken');

const imprimir = require('../utils/response');
const { obterAutorPorEmail } = require('../repositories/autores');
const password = require('../utils/password');

require('dotenv').config();

const autenticar = async (ctx) => {
	const { email = null, senha = null } = ctx.request.body;

	if (!email || !senha) return imprimir(ctx, 400, 'requisição mal formatada');

	const autor = await obterAutorPorEmail(email);
	if (!autor) return imprimir(ctx, 400, 'email ou senha incorreto');

	const comparison = await password.check(senha, autor.senha);
	if (!comparison) return imprimir(ctx, 400, 'senha inválida');

	const token = await Jwt.sign(
		{ id: autor.id, email: autor.email },
		process.env.JWT_SECRET || 'cubosacademy',
		{
			expiresIn: '300000',
		}
	);
	return imprimir(ctx, 200, 'usuário autenticado', 'autor', { token });
};

module.exports = autenticar;
