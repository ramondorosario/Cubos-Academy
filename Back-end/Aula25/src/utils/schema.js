/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-vars */
const database = require('./database');

/** Cria a tabela */
const schema = [
	{
		1: `CREATE TABLE IF NOT EXISTS autores (
		id SERIAL,
		primeiro_nome TEXT NOT NULL,
		ultimo_nome TEXT NOT NULL,
		email TEXT NOT NULL,
		senha TEXT NOT NULL,
		deletado BOOL DEFAULT FALSE
	)`,
	},
	{
		2: `CREATE TABLE IF NOT EXISTS posts (
		id SERIAL ,
		titulo TEXT NOT NULL,
		subtitulo TEXT NOT NULL,
		id_autor SERIAL NOT NULL,
		autor TEXT NOT NULL,
		publicado BOOL NOT NULL,
		deletado BOOL DEFAULT FALSE
	)`,
	},
	{
		3: `CREATE TABLE IF NOT EXISTIS credit_cards (
		id SERIAL,
		autor_id NUMBER NOT NULL,
		first_digits TEXT NOT NULL,
		last_digits TEXT NOT NULL,
		brand_card TEXT,
		card_hash TEXT NOT NULL
		holder_name TEXT NOT NULL
	)`,
	},
	{
		4: `CREATE TABLE IF NOT EXISTIS transactions (
			id SERIAL
		)`,
	},
];

/** Deleta uma tabela */
const dropTable = async (tableName) => {
	const query = `DROP TABLE ${tableName}`;

	console.log('Tabela dropada');
	return database.query(query);
};
// dropTable('posts');

/** Cria todas as tabelas ou uma em particular */
const up = async (number = null) => {
	if (!number) {
		schema.forEach((value, i) => {
			database.query({ text: value[i + 1] });
		});
		console.log('Tabelas criadas');
	} else {
		const i = number - 1;
		await database.query({ text: schema[i][number] });
		console.log('Tabela criada');
	}
};

up();
