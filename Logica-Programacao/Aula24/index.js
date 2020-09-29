// Exercícios dos videos
// Questão 1
const palavras = ['curso', 'aula', 'academy', 'programação'];

const resposta = palavras.find(x => x.length > 10);
console.log(resposta);

// Questão 2
const texto = `Olá
tudo bem?
Como vai você?
Já ta legal`

const textoArray = texto.split('');
const indices = [];

for(let i = 0; i < textoArray.length; i++) {
    const indiceEncontrado = textoArray.findIndex(x => x === '\n');
    if(indiceEncontrado !== -1) {
        indices.push(indiceEncontrado);
        textoArray.splice(indiceEncontrado, 1);
    };
}
console.log(indices);

// Questão 3
const numeros = [1,2,3,4,6,7,8];
const resposta = numeros.some(x => x % 2 === 0);
console.log(resposta);

// Questão 4
const numeros = [3,13, 11, 4];

const ehQuadradoPerfeito = (num) => {
    for (let i = 1; i < num; i++) {
        if (i * i === num) return true;
    }
    return false;
}    

const resposta = numeros.some(x => ehQuadradoPerfeito(x));
console.log(resposta);

// Questão 5
const precos = [1010, 2330, 2250, 4000, 2.29];
const resposta = precos.every(x => x > 0 && Math.floor(x) === x);
console.log(resposta);