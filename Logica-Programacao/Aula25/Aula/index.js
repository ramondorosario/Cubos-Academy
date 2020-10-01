// Exercícios de classe
// Questão 1
const numeros = [1, 3, 5, 12, 34, 21, 7, 4];

numeros.sort((a, b) => b - a);
console.log(numeros);

// Questão 2
// Ordem alfabética
const nomes = ["ana", "Junior", "pedro", "Cláudia", "adriana", "Álvaro"];

const nomeFormatado = nomes.map((x) => x[0].toUpperCase() + x.slice(1));
console.log(nomeFormatado.sort((a, b) => a.localeCompare(b)));

// Questão 3
// Ordem de z pra a
const nomes = ["ana", "Junior", "pedro", "Cláudia", "adriana", "Álvaro"];

const nomeFormatado2 = nomes.map((x) => x[0].toUpperCase() + x.slice(1));
console.log(nomeFormatado2.sort((a, b) => a.localeCompare(b)).reverse());

// Questão 4
// Ordem crescente em relação a idade
const pessoas = [
  {
    nome: "Diego",
    idade: 57,
  },
  {
    nome: "Ramon",
    idade: 25,
  },
  {
    nome: "Thiago",
    idade: 24,
  },
  {
    nome: "Juliana",
    idade: 25,
  },
  {
    nome: "Matheus",
    idade: 23,
  },
  {
    nome: "João",
    idade: 32,
  },
  {
    nome: "Talles",
    idade: 23,
  },
];

pessoas.sort((a, b) => {
  if (a.idade < b.idade) return -1;
  else if (a.idade > b.idade) return 1;
  else return a.nome.localeCompare(b.nome);
});
console.log(pessoas);
