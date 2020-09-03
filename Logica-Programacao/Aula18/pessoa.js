const texto = document.querySelector('p');
const pessoa = localStorage.getItem('pessoa');
const pessoaFormatada = JSON.parse(pessoa);

// Trata o nome da pessoa
const tratarNome = (x) => {
    const nome = x.split(' ');
    let resultado = '';

    nome.forEach((item, i) => nome[i] = item.replace(item[0], item[0].toUpperCase())
    )
    resultado = nome.join(' ')
    return resultado;
}

// Deixa o CPF no formato correto
const tratarCpf = (x) => {
    const cpf = x;
    const resultado = `${cpf.substr(0, 3)}.${cpf.substr(3, 3)}.${cpf.substr(6,3)}-${cpf.substr(9, 2)}`
    return resultado
}

// Deixa o numero de telefone formatado
const tratarTelefone = (x) => {
    const tel = x;
    if(tel.length === 11) {
        const resultado = `(${tel.substr(0, 2)}) 9${tel.substr(2, 4)}-${tel.substr(6, 4)}`
        return resultado
    } else if (tel.length === 9) {
        const resultado = `${tel.substr(0, 5)}-${tel.substr(5, 4)}`
        return resultado
    } else if (tel.length === 8) {
        const resultado = `${tel.substr(0, 4)}-${tel.substr(4, 4)}`
        return resultado
    } else {
        return tel;
    }
}

const nome = tratarNome(pessoaFormatada.nome.trim());
const idade = pessoaFormatada.idade;
const cpf = tratarCpf(pessoaFormatada.cpf);
const telefone = tratarTelefone(pessoaFormatada.telefone);
const email = pessoaFormatada.email;

if (pessoa) {
    texto.innerHTML = `<b>Nome Completo:</b> ${nome}<br>
    <b>Idade</b>: ${idade > 1 ? idade + ' anos': idade + ' ano'}<br>
    <b>CPF:</b> ${cpf}<br><b>Email</b>: ${email}<br>
    <b>Telefone:</b> ${telefone}`;
};