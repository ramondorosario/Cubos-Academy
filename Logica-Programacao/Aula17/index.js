// Exercícios de Fixação
// Questão 1
const numeros = [1, 2, 3, 4, 5];
numeros.forEach( x => console.log(x));

// Questão 2
const numeros = [1, 2, 3, 4, 5];

const novoArray = numeros.map(x => x * 5);
console.log(novoArray);

// Questão 3
const palavras = ['nome', 'teste', 'curso', 'fixação'];

const resultado = palavras.map(x => {
    return x.substr(0, x.length - 1) + x[x.length - 1].toUpperCase()
});
console.log(resultado);

// Questão 4
const numeros = [-1, 2, 3, 4, -4];

const novoArray = numeros.filter(x => x >= 0);
console.log(novoArray);

// Questão 5
const numeros = [1, 2, 3, 4, 5];

const novoArray = numeros.filter(x => x % 2 === 0);
console.log(novoArray)

// Questão 6
const palavras = ['anotar', 'teste', 'Academy', 'fixação'];

const resultado = palavras.filter(x => x[0] === 'a' || x[0] === 'A');
console.log(resultado);

//--------------------------------------------------------------------------

// Exercícios de Casa
// Questão 7
const numeros = [1, 2, 3, 4, 5];
console.log(numeros.reduce((acc, x) => acc + x)); 

// Questão 8
const palavras = ['exercício', 'fixação', 'curso', 'cubos', 'academy'];

const resultado = palavras.reduce((acc, x) => acc + ', ' + x);
console.log(resultado);

// Questão 9
const numeros = [1,2,32,4,5];

const resposta = numeros.reduce((acc, x) => {
    const resultado = acc >= x ? acc : x;
    return resultado
    });
console.log(resposta);

// Questão 10
const palavras = ['anotar', 'teste', 'Academy', 'fixar'];

const resultado = palavras.reduce((acc, x) => {
    let maior = acc.length >= x.length ? acc : x;
    return maior
})
console.log(resultado)