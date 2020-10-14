/* eslint-disable no-unused-vars */
const Jwt = require('jsonwebtoken');
const imprimir = require('../utils/response');

require('dotenv').config();

const verify = async (ctx, next) => {
	try {
		const [bearer, token] = ctx.headers.authorization.split(' ');
		const verification = await Jwt.verify(token, process.env.JWT_SECRET);

		ctx.state.userId = verification.id;
		ctx.state.email = verification.email;
	} catch (err) {
		return imprimir(ctx, 403, 'ação proibida');
	}

	return next();
};

module.exports = { verify };
