/* eslint-disable no-shadow */
const axios = require('axios').default;
const response = require('./response');

require('dotenv').config();

const pay = async (ctx, amount, card) => {
	try {
		const transaction = await axios.post(
			'https://api.pagar.me/1/transactions',
			{
				amount,
				...card,
				payment_method: 'credit_card',
				api_key: process.env.PAGARME_KEY,
			}
		);
		// console.log(transaction.data);
		return transaction.data.card;
	} catch (err) {
		// console.log(err.response.data);
		return response(ctx, 400, 'pagamento não concluído');
	}
};

module.exports = { pay };
