const database = require('../utils/database');

const criarBiblioteca = async () => {
	const query = `CREATE TABLE IF NOT EXISTS biblioteca (
		id SERIAL,
		titulo TEXT,
		autor TEXT,
		deletado BOOL
	)`;

	return database.query(query);
};

const adicionarLivro = async (livro) => {
	const query = {
		text: `INSERT INTO biblioteca (titulo, autor, deletado) VALUES ($1, $2, $3)`,
		values: [livro.titulo, livro.autor, livro.deletado],
	};

	return database.query(query);
};

const obterLivro = async (id) => {
	const query = {
		text: `SELECT * FROM biblioteca WHERE id = $1`,
		values: [id],
	};

	const resultado = await database.query(query);
	return resultado.rows;
};

const obterLivros = async () => {
	const query = `SELECT * FROM biblioteca`;

	const resultado = await database.query(query);
	return resultado.rows;
};

module.exports = {
	criarBiblioteca,
	adicionarLivro,
	obterLivros,
	obterLivro,
};
