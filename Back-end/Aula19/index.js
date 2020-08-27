const helpers = require('./helpers');
const fs = require('fs');
const correntistas = [
    {   
        cpf: '12312312312',
        nome: 'Fulano',
        idBanco: 104,
        agencia: '32112',
        conta: '1235467',
        saldo: 243020,
        registro: []
    },
    {   
        cpf: '23423423423',
        nome: 'Fulaninha', 
        idBanco: 001,      
        agencia: '32112',  
        conta: '1235467',  
        saldo: 291020,
        registro: []   
    },
    {   
        cpf: '23423423423',
        nome: 'Fulaninha', 
        idBanco: 237,      
        agencia: '33312',  
        conta: '1237567',  
        saldo: 21020,
        registro: []
    },
    {   
        cpf: '13413413413',
        nome: 'Aleatorio',
        idBanco: 237,
        agencia: '32112',
        conta: '1235467',
        saldo: 243020,
        registro: []
    },
    {   
        cpf: '45645645645',
        nome: 'Sicrano Jr',    
        idBanco: 652,      
        agencia: '32112',  
        conta: '1235467',  
        saldo: 272020,
        registro: []
    }
]

// Função a ser utilizada várias vezes
const verificarCorrentista = (cpf, idBanco) => {
    let indice;
    correntistas.forEach((correntista, i) => {
        if (correntista.cpf == cpf && correntista.idBanco == idBanco) {
            indice = i;
        }
    })    
    return indice;
}
//Grupo 2. Funções de Funcionalidade - Continuação Exercícios de Casa
// Questão 2
const correntista = (cpf) => {
    let array = [];
    correntistas.forEach((correntista, i) => {
        if (correntista.cpf == cpf) {
            array.push(correntista);
        }
    })
    if (array.length >= 1) return console.log(array);
    console.log('Não existe cadastro com esse CPF')
}

// Questão 3
const adicionarCorrentista = () => {    
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Informe o CPF que gostaria de cadastrar: ', (resposta) => {
        const cpf = resposta;
        rl.question('Informe o nome: ', (resposta) => {
            const nome = resposta;
            rl.question('Informe o código do banco que deseja fazer o cadastro: ', (resposta) => {
                const idBancoInfo = Number(resposta);
                let condicao = false;
                correntistas.forEach((correntista) => {
                    if (correntista.cpf == cpf && correntista.idBanco == idBancoInfo) {
                        const condicao = true;
                    }
                })
                if(condicao) {
                    console.log(`Já existe um cadastro com o CPF ${cpf} no banco informado`);
                    rl.close();
                } else {
                    // Gera o numero da agencia
                    let guardar = [];
                    for(let i = 1; i <= 5; i++) {
                        guardar.push(Math.round(Math.random()*5));                        
                    }
                    const agencia = guardar.join('');
                    guardar = [];
                    // Gera o numero da conta
                    for(let i = 1; i <= 7; i++) {
                        guardar.push(Math.round(Math.random()*10));                        
                    }
                    const conta = guardar.join('');                    
                    correntistas.push({
                        cpf: cpf,
                        nome: nome,
                        idBanco: idBancoInfo,
                        agencia: agencia,
                        conta: conta,
                        saldo: 0,
                    })
                    console.log('Cadastro realizado com sucesso');
                    console.log(correntistas.slice(-1));
                    rl.close();
                }
            })
        })
        
    })   
}

// Exercícios de Casa
// Questão 5
const atualizarCadastro = (cpf, idBanco, propriedade, valor) => {
    if(propriedade === 'saldo') return console.log('O saldo não pode ser atualizado');
    let indice = verificarCorrentista(cpf, idBanco);
    console.log(indice)
    if (indice != undefined) {
        correntistas[indice][propriedade] = valor;
        console.log('Cadastro atualizado com sucesso')
        return;
    }
    console.log('Não foi possível localizar o cadastro')
}

// Questão 6
const removerCadastro = (cpf, idBanco) => {
    let indice = verificarCorrentista(cpf, idBanco);
    if (indice != undefined) {
        correntistas.splice(indice, 1);
        console.log('Cadastro removido com sucesso');
        return;
    }
    console.log('Registro não encontrado')
}

// Questão 7
const depositarDinheiro = (cpf, idBanco, valor) => {
    let indice = verificarCorrentista(cpf, idBanco);
    if(indice != undefined) {
        correntistas[indice].saldo += valor;
        console.log('Deposito realizado com sucesso');
        correntistas[indice].registro.push({
            tipo: 'Entrada',
            dataOcorrencia: '25-08-2020 18:34',
            valorMovimentado: `R$ ${(valor / 100).toFixed(2)}`,
            sucessoTransferencia: 'não houve tentativa de transferência'
        })  
        return;
    }    
    console.log(`Cadastro não encontrado`);
}

// Questão 8
const transferirDinheiro = (cpfTransf, idBancoTransf, cpfFavorecido, idBancoFavorecido, valor) => {
    let indice1 = verificarCorrentista(cpfTransf, idBancoTransf);
    let indice2 = verificarCorrentista(cpfFavorecido, idBancoFavorecido);

    if (indice1 == undefined) {
        console.log(`Não consta nenhum cadastro com o CPF ${cpfTransf} no banco ${idBancoTransf}`);
        return
    } else if (indice2 == undefined) {
        console.log(`Não consta nenhum cadastro com o CPF ${cpfFavorecido} no banco ${idBancoFavorecido}`);
        return;
    }
    if (correntistas[indice1].saldo >= valor) {
        correntistas[indice1].saldo -= valor;
        correntistas[indice2].saldo += valor;
        console.log('Transferência realizada com sucesso');

        correntistas[indice1].registro.push({
            tipo: 'Saída',
            dataOcorrencia: '26-08-2020 17:34',
            valorMovimentado: `R$ ${(valor / 100).toFixed(2)}`,
            sucessoTransferencia: true
        })  
        correntistas[indice2].registro.push({
            tipo: 'Entrada',
            dataOcorrencia: '26-08-2020 17:34',
            valorMovimentado: `R$ ${(valor / 100).toFixed(2)}`,
        })  
        return
    }
    console.log('Saldo insuficiente');
    correntistas[indice1].registro.push({
        tipo: 'Saída',
        dataOcorrencia: '27-08-2020 10:34',
        valorMovimentado: `${'R$ '+(valor / 100).toFixed(2)+'[Falha na transação]'}`,
        sucessoTransferencia: false
    })  
}

// Questão 9
// As funções anteriores foram reescritas

// Questão 10
const sacarDinheiro = (cpf, idBanco, valor) => {
    let indice = verificarCorrentista(cpf, idBanco);
    if(indice != undefined) {
        if(correntistas[indice].saldo < valor) {
            console.log('Saldo insuficiente');
            return;
        } else {
            correntistas[indice].saldo -= valor;
            correntistas[indice].saida = valor;
            console.log('Saque efetuado com sucesso');
            
            correntistas[indice].registro.push({
                tipo: 'Saída',
                dataOcorrencia: '25-08-2020 13:34',
                valorMovimentado: `R$ ${(valor / 100).toFixed(2)}`
            })  
            return;
        }
    }
    console.log('Cadastro não encontrado')
}

// Questão 11
// Foram feitas modificações nas funções anteriores acrescentando registros de movimentação

// Questão 12
// Busca o extrato e permite escolher a quantidade a ser exibida. Para selecionar tudo, qtd = 'tudo'
const buscarExtrato = (cpf, idBanco, qtd) => {
    let indice = verificarCorrentista(cpf, idBanco);
    let busca;
    if (qtd == 'completo') qtd = qtd.length;
    if(indice != undefined) {
        busca = (correntistas[indice].registro);
        if (busca.length > 0) {            
            console.log(correntistas[indice].registro.slice(0, qtd));            
            return;
        } else {
            console.log('Não houve nenhuma movimentação');
            return;
        }
    }    
    console.log('Cadastro não encontrado')
}

// Questão 13
// Propriedade referente a sucesso implementada na função de transferencia

// Questão 14
const gerarExtrato = (cpf, idBanco) => {
    let indice = verificarCorrentista(cpf, idBanco);
    if (indice == undefined) return console.log(`Cadastro não encontrado`);
    
    const nomeBanco = helpers.nomeBanco(idBanco);
    const nomeCorrentista = correntistas[indice].nome;
    const cpfCorrentista = helpers.formatarCpf(cpf);
    const agencia = helpers.formatarAgencia(correntistas[indice].agencia);
    const conta = helpers.formatarConta(correntistas[indice].conta);
    let resultado = '';

    resultado += `|| ${nomeBanco} ||\nExtrato bancario de ${nomeCorrentista}, CPF ${cpfCorrentista}\nAgencia ${agencia} - Conta Corrente ${conta}\n-----------------------------------------------\n`;
    
    if (correntistas[indice].registro.length == 0) {
        return resultado += `|| SEM MOVIMENTAÇÕES ||\n-----------------------------------------------\n`
    }
    resultado += `|| MOVIMENTAÇÕES ||\n-----------------------------------------------\nTipo | Data da Ocorrência | Valor Movimentado\n-----------------------------------------------`;
    if (correntistas[indice].registro.length >= 1) {
        correntistas[indice].registro.forEach(propriedade => {
            if(propriedade.tipo == 'Saída') {
                resultado += `\n${propriedade.tipo} | ${propriedade.dataOcorrencia} | ${propriedade.valorMovimentado}`;
            } else if (propriedade.tipo == 'Entrada') {
                resultado += `\n${propriedade.tipo} | ${propriedade.dataOcorrencia} | ${propriedade.valorMovimentado}`
            }             
        })
    }
    return resultado;
}

// Questão 15;
const imprimirExtrato = (cpf, idBanco) => {
    let indice = verificarCorrentista(cpf, idBanco);
    if(indice != undefined) {
        const resultado = gerarExtrato(cpf, idBanco);
        fs.writeFile(`cpf_do_correntista_${(Math.random().toFixed(5))}.txt`, resultado, (err) => {
            if (err) {
                console.log(err);
            }
        })
        return;
    } else {
        console.log('Cadastro não encontrado')
    }
    
}
sacarDinheiro('12312312312', 104, 10000);
transferirDinheiro('12312312312', 104, '23423423423', 237, 11422);
depositarDinheiro('12312312312', 104, 15000);
sacarDinheiro('23423423423', 237, 7500)
imprimirExtrato('12312312312', 104);
imprimirExtrato('23423423423', 237);