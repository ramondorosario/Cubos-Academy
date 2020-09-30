const Koa = require('koa');

const server = new Koa();

const bodyParser = require('koa-bodyparser');
const router = require('./src/routes');

const imprimir = require('./src/utils/response');

require('dotenv').config();

const PORT = process.env.PORT || 8081;

server.use(bodyParser());
server.use(router.routes());

server.use((ctx) => {
	imprimir(ctx, 405, 'metodo não permitido');
});

server.listen(PORT, () => {
	console.log('Servidor rodando na porta ', PORT);
});
