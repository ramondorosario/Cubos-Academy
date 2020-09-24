// Exercícios do vídeo
// Questão 1
const arr1 = [1,2,3];
const arr2 = [5,6];

const arr3 = [...arr1, 4, ...arr2];
console.log(arr3);

// Questão 2
const arr1 = [1,2,3];
const arr2 = [5,6];

const arr3 = [0, ...arr1, 4, ...arr2, 7];
console.log(arr3);

// Questão 3
const arr1 = [1, 2, 3, 4, 5];

const [x, y, ...resto] = arr1;
console.log(...resto);

// Questão 4
//Criar novo objeto contendo apenas as propriedades: nome, profissao, idade, empresa, nivel e carga horária 
const dados = {
    nome: "André",
    idade: 23,
    profissao: "Desenvolvedor",
    altura: 176,
    peso: 70
}

const trabalho = {
    empresa: "Cubos",
    nivel: "Desenvolvedor Junior",
    cargaHoraria: "40h/semana"
};

const {altura, peso, ...resto} = dados;
const dadosSelecionados = {...resto, ...trabalho};

console.log(dadosSelecionados);

//--------------Exercícios de Casa--------------
// Questão 1
const arr1 = ['a', 'b', 'c'];
const arr2 = ['d', 'e'];

const novoArr = [...arr1, ...arr2];
console.log(novoArr);

// Questão 2
const arr1 = ['a', 'b', 'c'];
const arr2 = ['d', 'e'];

const novoArr = ['-', '-', ...arr1, '-', '-', ...arr2, '-', '-'];
console.log(novoArr);

// Questão 3
const carro = {
    modelo: "Gol",
    marca: "Volkswagen",
    cor: "Vermelho",
    potenciaCV: 80,
    preco: 3000000
}
const {preco, ...resto} = carro;
console.log(resto);

// Questão 4 e 5
const ordenar = (...args) => {
    console.log(args.sort());
}
ordenar(1,6,3,2,4);

// Questão 5
const ordenar = (...args) => {
    console.log(args.sort());
}
const arr = [1,6,3,8,5];
ordenar(...arr);