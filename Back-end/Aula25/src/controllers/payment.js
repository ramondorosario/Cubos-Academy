const pagarme = require('../utils/pagarme');
const response = require('../utils/response');
const autores = require('../repositories/autores');
const email = require('../utils/email');
const respostasHtml = require('../utils/repostas_html');

const payment = async (ctx) => {
	const {
		cardName = null,
		cardExpiration = null,
		cardNumber = null,
		cardCvv = null,
		amount = 0,
		authorId = null,
	} = ctx.request.body;

	if (!cardName || !cardExpiration || !cardNumber || !cardCvv)
		return response(ctx, 400, 'requisição mal formatada');

	if (!authorId)
		return response(ctx, 400, 'id do autor favorecido deve ser informado');

	const autorFavorecido = await autores.obterAutor(authorId);
	if (!autorFavorecido || autorFavorecido.deletado)
		return response(ctx, 404, 'autor favorecido não encontrado');

	const card = {
		card_holder_name: cardName,
		card_expiration_date: cardExpiration,
		card_number: cardNumber,
		card_cvv: cardCvv,
	};

	if (amount >= 100) {
		const resultado = await pagarme.pay(ctx, amount, card);
		await autores.atualizarSaldo(authorId, amount);

		const doador = ctx.state.email;
		// Envia um email de comprovante de pagamento para o doador
		await email.enviarEmail(
			doador,
			'comprovante de pagamento',
			respostasHtml.comprovantePagamento(amount)
		);

		const dadosDoador = await autores.obterAutor(ctx.state.userId);
		// Envia um email de recebimento de pagamento para o autor favorecido
		await email.enviarEmail(
			autorFavorecido.email,
			'recebimento de doação',
			`Você recebeu R$ ${(amount / 100)
				.toFixed(2)
				.replace('.', ',')} de ${dadosDoador.primeiro_nome} ${
				dadosDoador.ultimo_nome
			}`
		);

		return response(ctx, 201, 'pagamento realizado', 'card', {
			cardHash: resultado.id,
			bandeiraCartao: resultado.brand,
			nomeCartao: resultado.holder_name,
			primeirosDigitos: resultado.first_digits,
			ultimosDigitos: resultado.last_digits,
			dataValidade: resultado.expiration_date,
		});
	}
	return response(ctx, 400, 'valor do pagamento menor que R$ 1,00');
};

module.exports = { payment };
