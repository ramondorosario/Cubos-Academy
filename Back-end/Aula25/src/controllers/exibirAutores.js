const imprimir = require('../utils/response');
const autores = require('../repositories/autores');

const exibirAutores = async (ctx) => {
	let listaAutores = await autores.obterAutores();

	listaAutores = listaAutores.filter((x) => !x.deletado);

	imprimir(ctx, 200, 'autores encontrados', 'autores', listaAutores);
};

module.exports = exibirAutores;
