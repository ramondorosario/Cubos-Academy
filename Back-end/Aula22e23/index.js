const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const server = new koa();

server.use(bodyParser())

const correntistas = [
    {   
        cpf: '12312312312',
        nome: 'Fulano',
        idBanco: 104,
        agencia: '32112',
        conta: '1235467',
        saldo: 243020
    },
    {   
        cpf: '23423423423',
        nome: 'Fulana', 
        idBanco: 001,      
        agencia: '32112',  
        conta: '1235467',  
        saldo: 291020 
    }
];

// Adiciona correntista caso já não exista cadastro do mesmo
const adicionarCorrentista = (novoCorrentista) => {
    let existe = false;
    for (item of correntistas) {
        if (item.cpf === novoCorrentista.cpf && item.idBanco === novoCorrentista.idBanco) {
            existe = true;
        }
    }
    if (!existe) {
        const correntista = {
            cpf: novoCorrentista.cpf,
            nome: novoCorrentista.nome, 
            idBanco: novoCorrentista.idBanco,      
            agencia: novoCorrentista.agencia,  
            conta: novoCorrentista.conta, 
        }
        correntistas.push(correntista);
        return correntista;
    } else {
        return 'Correntista já se encontra registrado';
    }
}

// Atualiza um cadastro
const atualizarCadastro = (indice, propriedade, valor) => {
    if(propriedade === 'saldo') return 'O saldo não pode ser atualizado';
        
    correntistas[indice][propriedade] = valor;
    return correntistas[indice];   
}

//------------------------------------------------------------------------------
server.use((ctx) => {
    const path = ctx.path;
    if (path === '/correntistas' && ctx.method === 'GET') {
        return ctx.body = correntistas;
    } else if (path === '/correntistas' && ctx.method === 'POST')  {
        const novoCorrentista = ctx.request.body;
        const resultado = adicionarCorrentista(novoCorrentista);
        ctx.body = resultado;
    } else if (path.includes('/correntistas/')) {
        if (ctx.method === 'PUT') {
            const quebra = path.split('/');
            const indice = quebra[2];
            if (indice >= 0) {
                const propriedade = ctx.request.body.propriedade;
                const valor = ctx.request.body.valor;
                const resultado = atualizarCadastro(indice, propriedade, valor);
                ctx.body = resultado;
            } else {
                ctx.status = 404;
                ctx.body = 'Correntista não encontrado'
            }          
        } else if (ctx.method === 'DELETE') {
            const quebra = path.split('/');
            const indice = quebra[2];
            if (indice >= 0) {
                if (correntistas[indice]) {
                    const resultado = correntistas.splice(indice, 1);
                    ctx.body = 'Correntista deletado com sucesso'
                } else {
                    ctx.status = 404;
                    ctx.body = 'Correntista não encontrado'
                }                
            } else {
                ctx.status = 404;
                ctx.body = 'Correntista não encontrado'
            }          
        } else if (ctx.method === 'GET') {
            const quebra = path.split('/');
            const indice = quebra[2];
            if (correntistas[indice]) {
                ctx.body = correntistas[indice];
            } else {
                ctx.status = 404;
                ctx.body = 'Correntista não encontrado'
            }
        } else {
            ctx.status = 404;
            ctx.body = 'Não encontrado';
        }
    } else {
        ctx.status = 404;
        ctx.body = 'Não encontrado'
    }    
})

server.listen(8081, () => {
    console.log('O servidor foi iniciado')
})