const imprimir = require('../utils/response');
const autores = require('../repositories/autores');

const verify = async (ctx, next) => {
	const { email = null } = ctx.state;
	if (!email) return imprimir(ctx, 400, 'requisição mal formatada');

	const resultado = await autores.obterAutorPorEmail(email);

	if (!resultado.verificado)
		return imprimir(
			ctx,
			403,
			'ação proibida. O email do usuário não confirmado'
		);

	return next();
};

module.exports = { verify };
