const pagarme = require('../utils/pagarme');
const response = require('../utils/response');

const payment = async (ctx) => {
	const {
		cardName = null,
		cardExpiration = null,
		cardNumber = null,
		cardCvv = null,
		amount = 0,
	} = ctx.request.body;

	if (!cardName || !cardExpiration || !cardNumber || !cardCvv)
		return response(ctx, 400, 'requisição mal formatada');

	const card = {
		card_holder_name: cardName,
		card_expiration_date: cardExpiration,
		card_number: cardNumber,
		card_cvv: cardCvv,
	};

	if (amount >= 1) {
		const resultado = await pagarme.pay(ctx, amount, card);

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
