const fs = require('fs');

let jogosLinha, jogos, jogo;

fs.readFile('brasileirao.txt', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    jogosLinha = data.toString().split('\n');

    jogos = [];
    jogosLinha.forEach(linha => {
        jogos.push(linha.split('\t'))
    })

    jogo = jogos.map(jogo => {
        return {
            timeA: jogo[0],
            timeB: jogo[4],
            golsA: Number(jogo[1]),
            golsB: Number(jogo[3]),
        }
    })

    jogo.forEach(x => {
        if(x.golsA > x.golsB) {
            pontuar(x.timeA, 3, x.golsA, x.golsB);
            pontuar(x.timeB, 0, x.golsB, x.golsA);
        } else if (x.golsB > x.golsA) {
            pontuar(x.timeA, 0, x.golsA, x.golsB);
            pontuar(x.timeB, 3, x.golsB, x.golsA);
        } else {
            pontuar(x.timeA, 1, x.golsA, x.golsB);
            pontuar(x.timeB, 1, x.golsB, x.golsA);
        }
    })

    ordernarTabela();
    console.log(tabelaOrdenada);
    // exibirJogos('Flamengo');
    // jogosRodada(1);
    // libertadores();
    // rebaixados();
})

const tabela = [];
/** Faz todo o cálculo referente a pontuação de cada time */
const pontuar = (time, ponto, golsFeitos, golsSofridos) => {
    let temTime = false;
    tabela.forEach((item, i) => {
        if (item.time === time) {
            tabela[i].pontos += ponto;
            tabela[i].partidas ++;
            tabela[i].vitorias += ponto === 3 ? 1 : 0;
            tabela[i].derrrotas += ponto === 0 ? 1 : 0;
            tabela[i].empates += ponto === 1 ? 1 : 0; 
            tabela[i].gols_feitos += golsFeitos;
            tabela[i].gols_sofridos += golsSofridos;
            tabela[i].saldo_de_gols += golsFeitos - golsSofridos;
            temTime = true;
        }
    }) 

    if (!temTime) {
        tabela.push ({
            time: time,
            pontos: ponto,
            partidas: 1,
            vitorias: ponto === 3 ? 1 : 0,
            derrrotas: ponto === 0 ? 1 : 0,
            empates: ponto === 1 ? 1 : 0,
            gols_feitos: golsFeitos,
            gols_sofridos: golsSofridos,
            saldo_de_gols: golsFeitos - golsSofridos
        })
    }    
}

const tabelaOrdenada = [];
/** Ordena do maior pontuador para o menor. Em caso de pontuação igual, segue os critérios de desempate: vitorias, saldo, gols feitos */
const ordernarTabela = () => {
    const cloneTabela = tabela;

    while (cloneTabela.length > 0) {
        const resultado = cloneTabela.reduce((acc, item) => {
            if (acc.pontos > item.pontos) {
                return acc;
            } else if (acc.pontos < item.pontos) {
                return item;
            } else if (acc.vitorias > item.vitorias) {
                return acc;
            } else if (acc.saldo_de_gols > item.saldo_de_gols) {
                return acc;
            } else if (acc.gols_feitos > item.gols_feitos) {
                return acc;
            } else {
                return item;
            }
        })
        tabelaOrdenada.push(resultado);
        const i = cloneTabela.indexOf(resultado);
        cloneTabela.splice(i, 1)
    }
}

// Exercício extra
// Questão 1 e 2 já implementadas no código

// Questão 3
// Exibe todos os jogos de um time específico
const exibirJogos = (time) => {
    const jogos = jogo.filter(item => {
        if (item.timeA === time || item.timeB === time) {
            return item;
        }
    })
    console.log(jogos)
}

// Questão 4
// Exibe todos os jogos da rodada escolhida
const jogosRodada = (rodada) => {
    if (rodada < 1 || rodada > 38) {
        return console.log('Rodada inválida')
    }
    const iniciar = (rodada * 10) - 10;
    const parar = iniciar + 10;
    console.log(`Rodada ${rodada}`);
    const jogos = jogo.slice(iniciar, parar);
    console.log(jogos)
}

// Questão 5
// Exibe os 4 times classificados para libertadores
const libertadores = () => {
    for (let i = 0; i < 4; i++) {
        console.log(tabelaOrdenada[i].time);
    }
}

// Questão 6
// Exibe os 4 times rebaixados
const rebaixados = () => {
    const rebaixados = tabelaOrdenada.slice(-4);
    for (let i = 0; i < 4; i++) {
        console.log(rebaixados[i].time);
    }
}