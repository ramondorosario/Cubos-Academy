const database = require('../utils/database');

/** Cria um post */
const criarPost = async (dados) => {
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
	const query = `SELECT * FROM posts WHERE id= ${id}`;
	const resultado = await database.query(query);
	return resultado.rows.shift();
};

/** Obtem a lista de todos os posts */
const obterPosts = async () => {
	const query = `SELECT * FROM posts`;
	const resultado = await database.query(query);
	return resultado.rows;
};

/** Atualiza as informações de um post */
const atualizarPost = async (id, propriedade, valor) => {
	const query = `UPDATE posts SET ${propriedade}= '${valor}' WHERE id= ${id}`;

	const resultado = await database.query(query);
	return resultado.rows.shift();
};

/** Deleta um post */
const deletarPost = async (id) => {
	const query = `UPDATE posts SET deletado = true WHERE id= ${id} RETURNING *`;

	const resultado = await database.query(query);
	return resultado.rows.shift();
};

/** Deleta um post */
const deletarPostsAutor = async (idAutor) => {
	const query = `UPDATE posts SET deletado = true WHERE id_autor= ${idAutor} RETURNING *`;

	return database.query(query).rows;
};

module.exports = {
	criarPost,
	obterPost,
	obterPosts,
	atualizarPost,
	deletarPost,
	deletarPostsAutor,
};
