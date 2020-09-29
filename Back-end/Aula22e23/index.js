const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const server = new koa();

const router = require('./src/routes');
const imprimir = require('./src/utils/code');

server.use(bodyParser());

server.use(router.routes());

//------------------------------------------------------------------------------
server.use((ctx) => {
    if(ctx.method === 'PUT' || ctx.method === 'DELETE') imprimir(ctx, 404,'id do correntista não informado');
    else imprimir(ctx, 405, 'recurso não encontrado');
})

server.listen(8081, () => {
    console.log('O servidor foi iniciado')
})