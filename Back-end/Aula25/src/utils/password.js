const bcrypt = require('bcryptjs');

/** Criptografa uma senha */
const encrypt = async (password) => {
	const hash = await bcrypt.hash(password, 10);
	return hash;
};

/** Checa se a senha normal é igual a encriptada */
const check = async (password, hash) => {
	const comparison = await bcrypt.compare(password, hash);
	return comparison;
};

module.exports = { check, encrypt };
