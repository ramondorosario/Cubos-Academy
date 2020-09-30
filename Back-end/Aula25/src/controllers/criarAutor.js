const imprimir = require('../utils/response');

const autores = [];
/** Encontra um elemento específico em um array */
const encontrar = (origem, id) => {
	let resultado = false;
	let indice;
	origem.forEach((item, i) => {
		if (item.id === id) {
			resultado = true;
			indice = i;
		}
	});
	// O retorno sempre vai ser um array dizendo se existe o elemento buscado e qual a posição que ele se encontra
	const resposta = [resultado, indice];
	return resposta;
};

/** Cria um autor */
const criarAutor = (ctx) => {
	const conteudo = ctx.request.body;
	const newId = conteudo.id;
	const resposta = encontrar(autores, newId);

	if (!resposta[0]) {
		if (conteudo !== '') {
			autores.push(conteudo);
			imprimir(ctx, 201, 'autor criado com sucesso', 'autor', conteudo);
		} else {
			imprimir(ctx, 400, 'autor mal formatado');
		}
	} else {
		imprimir(ctx, 401, 'já existe um autor com o id informado');
	}
};
module.exports = { criarAutor, autores };
