const database = require('../utils/database');

/** Cria um autor */
const criarAutor = async (dados) => {
	const query = {
		text: `INSERT INTO autores (primeiro_nome, ultimo_nome, email, senha) VALUES ($1, $2, $3, $4) RETURNING *`,
		values: [
			dados.primeiro_nome,
			dados.ultimo_nome,
			dados.email,
			dados.senha,
		],
	};
	const resultado = await database.query(query);
	return resultado.rows.shift();
};

const obterAutor = async (id) => {
	const query = `SELECT * FROM autores WHERE id=${id}`;

	const resultado = await database.query(query);
	return resultado.rows.shift();
};

/** Obtem a lista dos autores */
const obterAutores = async () => {
	const query = `SELECT * FROM autores;`;
	const resultado = await database.query(query);

	return resultado.rows;
};

const obterAutorPorEmail = async (email) => {
	const query = `SELECT * FROM autores WHERE email='${email}'`;

	const result = await database.query(query);
	return result.rows.shift();
};

/** Deleta um autor */
const deletarAutor = async (id) => {
	const query = `UPDATE autores SET deletado=true WHERE id=${id} RETURNING *`;

	const resultado = await database.query(query);
	return resultado.rows.shift();
};

/** Atualiza as informações de um autor */
const atualizarAutor = async (id, propriedade, valor) => {
	const query = `UPDATE autores SET ${propriedade}= '${valor}' WHERE id= ${id}`;

	const resultado = await database.query(query);
	return resultado.rows.shift();
};

module.exports = {
	criarAutor,
	obterAutor,
	obterAutorPorEmail,
	obterAutores,
	deletarAutor,
	atualizarAutor,
};
