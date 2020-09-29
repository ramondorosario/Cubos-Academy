const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const server = new Koa();
server.use(bodyParser());

const { formatarErro } = require('./src/utils/code');

const router = require('./src/routes');

server.use(router.routes());

server.use((ctx) => {
	formatarErro(ctx, 405, 'Metodo nao permitido');
});

server.listen('8081', () => {
	console.log('Rodando na porta 8081');
});
