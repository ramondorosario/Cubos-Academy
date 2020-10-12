const password = require('../utils/password');
const imprimir = require('../utils/response');

const encrypt = async (ctx, next) => {
	const { senha = null } = ctx.request.body;

	if (!senha) return imprimir(ctx, 400, 'requisição mal formatada');

	const hash = await password.encrypt(senha);
	ctx.state.hash = hash;

	return next();
};

module.exports = { encrypt };
