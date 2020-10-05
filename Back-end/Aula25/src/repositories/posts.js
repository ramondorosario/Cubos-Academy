const database = require('../utils/database');

/** Cria a tabela posts caso ela não exista */
const criarTabela = () => {
	const query = `CREATE TABLE IF NOT EXISTS posts (
		id SERIAL,
		titulo TEXT,
		subtitulo TEXT,
		id_autor SERIAL,
		autor TEXT,
		publicado BOOL,
		deletado BOOL DEFAULT FALSE
	)`;

	return database.query(query);
};

/** Cria um post */
const criarPost = async (dados) => {
	await criarTabela();

	const query = {
		text: ` INSERT INTO posts (titulo, subtitulo, id_Autor,autor, publicado) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
		values: [
			dados.titulo,
			dados.subtitulo,
			dados.idAutor,
			dados.autor,
			dados.publicado,
		],
	};

	const resultado = await database.query(query);
	return resultado.rows.shift();
};

/** Obtem um post em particular */
const obterPost = async (id) => {
	await criarTabela();

	const query = `SELECT * FROM posts WHERE id= ${id}`;
	const resultado = await database.query(query);
	return resultado.rows.shift();
};

/** Obtem a lista de todos os posts */
const obterPosts = async () => {
	await criarTabela();

	const query = `SELECT * FROM posts`;
	const resultado = await database.query(query);
	return resultado.rows;
};

/** Atualiza as informações de um post */
const atualizarPost = async (id, propriedade, valor) => {
	await criarTabela();

	const query = `UPDATE posts SET ${propriedade}= '${valor}' WHERE id= ${id}`;

	const resultado = await database.query(query);
	return resultado.rows.shift();
};

/** Deleta um post */
const deletarPost = async (id) => {
	await criarTabela();

	const query = `UPDATE posts SET deletado = true WHERE id= ${id} RETURNING *`;

	const resultado = await database.query(query);
	return resultado.rows.shift();
};

/** Deleta um post */
const deletarPostsAutor = async (idAutor) => {
	await criarTabela();

	const query = `UPDATE posts SET deletado = true WHERE id_autor= ${idAutor} RETURNING *`;

	return console.log(await (await database.query(query)).rows);
};

module.exports = {
	criarTabela,
	criarPost,
	obterPost,
	obterPosts,
	atualizarPost,
	deletarPost,
	deletarPostsAutor,
};
