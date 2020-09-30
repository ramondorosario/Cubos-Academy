const imprimir = require('../utils/response');
const autores = require('./criarAutor').autores;

/** Atualiza um autor */
const atualizarAutor = (ctx) => {
	const { id } = ctx.params;
	const indiceAutor = autores.findIndex((x) => x.id === id);

	const novasInformacoes = ctx.request.body;

	if (indiceAutor !== -1) {
		if (!autores[indiceAutor].deletado) {
			// Se o autor não estiver deletado, poderá sofrer atualização
			if (
				novasInformacoes.id !== undefined ||
				novasInformacoes.deletado !== undefined
			) {
				// propriedade id e deletado, não pode ser modificado
				imprimir(ctx, 401, 'Id ou Deletado não pode sofrer alteração');
				return;
			}
			if (novasInformacoes.email !== undefined) {
				autores[indiceAutor].email = novasInformacoes.email;
			}
			if (novasInformacoes.senha !== undefined) {
				autores[indiceAutor].senha = novasInformacoes.senha;
			}
			if (novasInformacoes.primeiro_nome !== undefined) {
				autores[indiceAutor].primeiro_nome =
					novasInformacoes.primeiro_nome;
			}
			if (novasInformacoes.primeiro_nome !== undefined) {
				autores[indiceAutor].ultimo_nome = novasInformacoes.ultimo_nome;
			}
			const autor = autores[indiceAutor];
			imprimir(ctx, 200, 'autor atualizado com sucesso', 'autor', autor);
		} else imprimir(ctx, 401, 'autor foi deletado');
	} else {
		imprimir(ctx, 404, 'autor não encontrado');
	}
};
module.exports = atualizarAutor;
