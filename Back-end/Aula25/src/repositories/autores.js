const database = require('../utils/database');

/** Cria a tabela caso não exista */
const criarTabela = async () => {
	const query = `CREATE TABLE IF NOT EXISTS autores (
		id SERIAL,
		primeiro_nome TEXT,
		ultimo_nome TEXT,
		email TEXT,
		senha TEXT,
		deletado BOOL DEFAULT FALSE
	)`;

	return database.query(query);
};

/** Cria um autor */
const criarAutor = async (dados) => {
	await criarTabela();
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
	await criarTabela();
	const query = `SELECT * FROM autores WHERE id=${id}`;

	const resultado = await database.query(query);
	return resultado.rows.shift();
};

/** Obtem a lista dos autores */
const obterAutores = async () => {
	await criarTabela();

	const query = `SELECT * FROM autores;`;
	const resultado = await database.query(query);

	return resultado.rows;
};

/** Deleta um autor */
const deletarAutor = async (id) => {
	await criarTabela();

	const query = `UPDATE autores SET deletado=true WHERE id=${id} RETURNING *`;

	const resultado = await database.query(query);
	return resultado.rows.shift();
};

/** Atualiza as informações de um autor */
const atualizarAutor = async (id, propriedade, valor) => {
	await criarTabela();

	const query = `UPDATE autores SET ${propriedade}= '${valor}' WHERE id= ${id}`;

	const resultado = await database.query(query);
	return resultado.rows.shift();
};

module.exports = {
	criarTabela,
	criarAutor,
	obterAutor,
	obterAutores,
	deletarAutor,
	atualizarAutor,
};
