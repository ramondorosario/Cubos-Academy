const imprimir = require('../utils/code');
const correntistas = require('../controllers/exibirCorrentistas').correntistas;

/** Adiciona correntista caso não exista cadastro do mesmo */ 
const adicionarCorrentista = (ctx) => {
    const novoCorrentista = ctx.request.body;
    let existe = false;

    if(!novoCorrentista.cpf) return imprimir(ctx, 400, 'requisição mal formatada');
    
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
        imprimir(ctx, 201, 'correntista foi registrado', 'correntista', correntista);
    } else {
        imprimir(ctx, 401, 'Correntista já se encontra registrado');
    }
}

module.exports = adicionarCorrentista;