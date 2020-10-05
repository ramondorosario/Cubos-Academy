const imprimir = require('../utils/response');
const autores = require('../repositories/autores');

/** Atualiza um autor */
const atualizarAutor = async (ctx) => {
	const { id } = ctx.params;
	let autor = await autores.obterAutor(id);

	const novasInformacoes = ctx.request.body;

	if (autor) {
		if (!autor.deletado) {
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
				await autores.atualizarAutor(
					id,
					'email',
					novasInformacoes.email
				);
			}
			if (novasInformacoes.senha !== undefined) {
				await autores.atualizarAutor(
					id,
					'senha',
					novasInformacoes.senha
				);
			}
			if (novasInformacoes.primeiro_nome !== undefined) {
				await autores.atualizarAutor(
					id,
					'primeiro_nome',
					novasInformacoes.primeiro_nome
				);
			}
			if (novasInformacoes.ultimo_nome !== undefined) {
				await autores.atualizarAutor(
					id,
					'ultimo_nome',
					novasInformacoes.ultimo_nome
				);
			}

			autor = await autores.obterAutor(id);
			imprimir(ctx, 200, 'autor atualizado', 'autor', autor);
		} else imprimir(ctx, 401, 'autor foi deletado');
	} else {
		imprimir(ctx, 404, 'autor não encontrado');
	}
};
module.exports = atualizarAutor;
