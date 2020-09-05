const koa = require('koa');
const bodyParser = require('koa-bodyparser');

const server = new koa();

server.use(bodyParser());

server.use((ctx) => {

})

server.listen('8081', () => {
    console.log('Rodando na porta 8081');
})