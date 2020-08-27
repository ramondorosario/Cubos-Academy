// Bancos
const banco = {
    001: 'Banco do Brasil S.A.',
    033: 'Banco Santander (Brasil) S.A.',
    104: 'Caixa Econômica Federal',
    237: 'Banco Bradesco S.A.',
    341: 'Banco Itaú S.A.',
    356: 'Banco Real S.A. (antigo)',
    389: 'Banco Mercantil do Brasil S.A.',
    399: 'HSBC Bank Brasil S.A.',
    422: 'Banco Safra S.A.',
    453: 'Banco Rural S.A.',
    633: 'Banco Rendimento S.A.',
    652: 'Itaú Unibanco Holding S.A.',
    745: 'Banco Citibank S.A.'
}

// Questão 1
const consultarBanco = (id) => {
    const nomeBanco = banco[id].replace('(antigo)', '').replace('(Brasil)', '').replace('Holding', '').replace('S.A.', '').trim();
    return nomeBanco;
}

// Questão 2
const removerCaracteres = (entrada) => {
    const resultado = entrada.replace(/[.-]/g, '');
    console.log(resultado)
}

// Questão 3
const formatarCpf = (cpf) => {
    let formatado = `${cpf.substr(0,3)}.${cpf.substr(3,3)}.${cpf.substr(6,3)}-${cpf.substr(9,2)}`;
    return formatado;   
}

// Questão 4
const formatarAgencia = (agencia) => {
    const i = agencia.length - 1;
    const formatado = agencia.substr(0,4) + `-${agencia[i]}`;
    return formatado
}

// Questão 5
const formatarNumeroConta = (numeroConta) => {
    const i = numeroConta.length - 1;
    const formatado = numeroConta.substr(0,6) + `-${numeroConta[i]}`;
    return formatado;
}

// Questão 6
module.exports = {
    nomeBanco: consultarBanco,
    removerCaracteres: removerCaracteres,
    formatarCpf: formatarCpf,
    formatarAgencia: formatarAgencia,
    formatarConta: formatarNumeroConta
}