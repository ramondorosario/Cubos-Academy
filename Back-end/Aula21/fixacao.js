// Exercícios de Fixação
// Questão 1.A
const maioridade = (idade) => idade >= 18 ? 'true' : 'false';

// Questão 1.B
const escolherHeroina = (grupo) => (grupo === 'marvel') ? 'Capitã Marvel' : 'Mulher Maravilha';

// Questão 1.C
const calculardIdade = (animal, idade) => {
    let resposta = animal === 'gato' ? 
        (idade <= 1 ? 15 : (idade === 2 ? 25 : 25 + (idade - 2) * 4)) : animal === 'cachorro' ? 
            (idade <= 1 ? 15 : 15 + ((idade - 1) * 7)) : 15;
    return resposta;
}

// Operador new
// Servidor Web

// Questão 2
const Koa = require('koa')
const server = new Koa();

//Questão 3
server.use (async ctx => {
    ctx.body = 'Hey! Esta é aula 21!';
    if(ctx.originalUrl === '/cara_ou_coroa') {
        const resultado = Math.floor(Math.random()*100);
        if (resultado <= 50) ctx.body = 'Cara!'
        else ctx.body = 'Coroa!'
    } 

// Questão 4    
    if (ctx.originalUrl === '/raiz_quadrada/') ctx.body = 'Você precisa passa um numero na requisição!';
    if (ctx.originalUrl === '/raiz_quadrada/2') ctx.body = 'Raiz quadrada de 2 é 4';
    if (ctx.originalUrl === '/raiz_quadrada/50') ctx.body = 'A raiz quadrada de 50 é 2500';

// Questão 5
    if (ctx.originalUrl === '/divisao/') ctx.body = 'Você precisa passar dois números na requisição!';
    if (ctx.originalUrl === '/divisao/2/2') {
        let resultado = 2 / 2;
        ctx.body = `A divisão de 2 por 2 é ${resultado}`;
    }
    if (ctx.originalUrl === '/divisao/37/6') {
        let resultado = 37 / 6;
        ctx.body = `A divisão de 37 por 6 é ${resultado}`;
    }
})

server.listen(8081, () => {
    console.log('Servidor iniciado')
})