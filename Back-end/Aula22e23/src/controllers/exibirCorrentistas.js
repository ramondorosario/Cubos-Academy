const imprimir = require('../utils/code');

// Correntistas já adicionados
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

const exibirCorrentistas = (ctx) => {
    imprimir(ctx, 200, 'lista de correntistas encontrada', 'correntistas', correntistas);
}

module.exports = { exibirCorrentistas, correntistas };