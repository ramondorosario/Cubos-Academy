const axios = require('axios').default;

require('dotenv').config();

axios
	.post('https://api.pagar.me/1/transactions', {
		amount: 1000,
		card_holder_name: 'Fulano de Tal',
		card_expiration_date: '0721',
		card_number: '5326587338146253',
		card_cvv: '281',
		payment_method: 'credit_card',
		api_key: process.env.PAGARME_KEY,
	})
	.then((res) => console.log(res))
	.catch((err) => console.log(err.response.data));
