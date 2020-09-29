const imprimir = require("../utils/code");
const correntistas = require('./exibirCorrentistas').correntistas;

/** Atualiza um cadastro */ 
const atualizarCadastro = (ctx) => {
    const indice = ctx.params.id;
    const temCorrentista = correntistas[indice];

    if(!temCorrentista || indice === '') return imprimir(ctx, 404, 'correntista não encontrado');

    const conteudo = ctx.request.body;

    if(conteudo.saldo) return imprimir(ctx, 401, 'O saldo não pode ser atualizado')
    else if(conteudo.cpf) return imprimir(ctx, 401, 'O CPF não pode ser atualizado');
    else if(conteudo.nome) return imprimir(ctx, 401, 'O nome não pode ser atualizado');
    else if(conteudo === '') return imprimir(ctx, 400, 'requisição mal formatada'); 

    if(conteudo.idBanco) {
        correntistas[indice].idBanco = conteudo.idBanco;    
    }
    if(conteudo.agencia) {
        correntistas[indice].agencia = conteudo.agencia;    
    }
    if(conteudo.conta) {
        correntistas[indice].conta = conteudo.conta;    
    }   

    imprimir(ctx, 200, 'correntista atualizado', 'correntista', correntistas[indice]); 
}

module.exports = atualizarCadastro;