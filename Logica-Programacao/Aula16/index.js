// Exercícios de classe e de fixação
const numeros = [1,2,13,4,12,6,7,8,9,11];

// Questão 1
for (const num of numeros) {
    console.log(num)
}

// Questão 2
for (let num of numeros) {
    if(num > 10) {
        console.log(num);
    }
};

// Questão 3
numeros.forEach(num => console.log(num))

// Questão 4
numeros.forEach((num, i) => {
    console.log(i, num)
})

// Questão 5
numeros.forEach((num, i) => {
    numeros[i] = num * 2;
})
console.log(numeros)


// Exercícios de casa
const partidas = [
   {
       time1: 2,
       time2: 4
    },
    {
        time1: 0,
        time2: 0
    },
    {
        time1: 3,
        time2: 3
    },
    {
        time1: 3,
        time2: 1
    },
    {
        time1: 1,
        time2: 1
    },
    {
        time1: 1,
        time2: 3
    },
    {
        time1: 2,
        time2: 2
    }
]
// Questão 6
let time1 = 0, time2 = 0, empate = 0;
partidas.forEach((partida) => {
    if(partida.time1 > partida.time2) {
        time1++
    } else if (partida.time1 < partida.time2){
        time2++
    } else {
        empate++
    }
})
console.log(`Time1 venceu ${time1} partidas\nTime2 venceu ${time2} partidas\nTime1 empatou ${empate} vezes com o Time2`);

// Questão 7
partidas.forEach((partida) => {
    if(partida.time1 > partida.time2) {
        time1 += 3
    } else if (partida.time1 < partida.time2){
        time2 += 3
    } else {
        empate++
    }
})
console.log(`Time1 tem um total de ${time1 + empate} pontos\nTime2 tem um total de ${time2 + empate} pontos`);

// Questão 8
let totGolsTime1 = 0, totGolsTime2 = 0;
partidas.forEach((partida) => {
    totGolsTime1 += partida.time1;
    totGolsTime2 += partida.time2;
})
console.log(`Time1: ${totGolsTime1} gols marcados e ${totGolsTime2} gols sofridos\nTime2: ${totGolsTime2} gols marcados e ${totGolsTime1} gols sofridos`);

// Questão 9
let maisDeSeis = 0;
partidas.forEach((partida) => {
    if ((partida.time1 + partida.time2) >= 6) {
        maisDeSeis++
    }
})
console.log(`Entre os confrontros entre o Time1 e o Time2, teve-se ${maisDeSeis} partidas com mais de 6 gols`);

// Questão 10
partidas.forEach((partida, i) => {
    if (partida.time1 === 0 && partida.time2 === 0) {
        console.log(`Tivemos um empate na partida ${i}`)
    }
})