const fs = require('fs');

// Questão 1 - Ler arquivo txt
const conteudo = fs.readFileSync('brasileirao.txt').toString().split('\n');

const jogos = conteudo.map((jogo) => {
	const linhas = jogo.split('\t');
	return {
		timeA: linhas[0],
		golsA: Number(linhas[1]),
		timeB: linhas[4],
		golsB: Number(linhas[3]),
	};
});

const tabela = [];
// Questão 2 - Criar tabela formatada
const atualizarTime = (nomeTime, golsFeitos, golsSofridos, pontuacao) => {
	const id = tabela.findIndex((x) => x.time === nomeTime);
	if (id === -1) {
		tabela.push({
			time: nomeTime,
			jogos: 1,
			pontos: pontuacao,
			vitorias: pontuacao === 3 ? 1 : 0,
			derrotas: pontuacao === 0 ? 1 : 0,
			empates: pontuacao === 1 ? 1 : 0,
			'gols feitos': golsFeitos,
			'gols sofridos': golsSofridos,
			saldo: golsFeitos - golsSofridos,
		});
		return;
	}

	tabela[id].jogos += 1;
	tabela[id].pontos += pontuacao;
	tabela[id].vitorias += pontuacao === 3 ? 1 : 0;
	tabela[id].derrotas += pontuacao === 0 ? 1 : 0;
	tabela[id].empates += pontuacao === 1 ? 1 : 0;
	tabela[id]['gols feitos'] += golsFeitos;
	tabela[id]['gols sofridos'] += golsSofridos;
	tabela[id].saldo += golsFeitos - golsSofridos;
};

jogos.forEach((x) => {
	if (x.golsA > x.golsB) {
		atualizarTime(x.timeA, x.golsA, x.golsB, 3);
		atualizarTime(x.timeB, x.golsB, x.golsA, 0);
	} else if (x.golsA < x.golsB) {
		atualizarTime(x.timeA, x.golsA, x.golsB, 0);
		atualizarTime(x.timeB, x.golsB, x.golsA, 3);
	} else {
		atualizarTime(x.timeA, x.golsA, x.golsB, 1);
		atualizarTime(x.timeB, x.golsB, x.golsA, 1);
	}
});

// Questão 3 - Tabela em ordem decrescente em número de pontos com critérios de desempate
const tabelaOrdenada = tabela.sort((a, b) => {
	if (a.pontos > b.pontos) return -1;
	if (a.pontos < b.pontos) return 1;
	if (a.vitorias > b.vitorias) return -1;
	if (a.vitorias < b.vitorias) return 1;
	if (a.saldo > b.saldo) return -1;
	if (a.saldo < b.saldo) return 1;
	if (a.golsFeitos > b.golsFeitos) return -1;
	if (a.golsFeitos > b.golsFeitos) return 1;
	return a.time.localeCompare(b.time);
});

const converterParaString = (tabelaAConverter) => {
	let texto = '';
	texto +=
		'|------Time------|--Pontos--|--J--|--V--|--E--|--D--|--GP--|--GS--|--SG--|\n';
	for (const item of tabelaAConverter) {
		texto += `|${item.time.padEnd(16)}`;
		texto += `|${item.pontos.toString().padEnd(10)}`;
		texto += `|${item.jogos.toString().padEnd(5)}`;
		texto += `|${item.vitorias.toString().padEnd(5)}`;
		texto += `|${item.empates.toString().padEnd(5)}`;
		texto += `|${item.derrotas.toString().padEnd(5)}`;
		texto += `|${item['gols feitos'].toString().padEnd(6)}`;
		texto += `|${item['gols sofridos'].toString().padEnd(6)}`;
		texto += `|${item.saldo.toString().padEnd(6)}|\n`;
	}
	return texto;
};

const criarArquivo = (nomeArquivo, tabelaEscolhida) => {
	const txt = converterParaString(tabelaEscolhida);
	fs.writeFile(nomeArquivo, txt, (err) => {
		if (err) {
			console.log(err);
		}
	});
};
criarArquivo('tabela.txt', tabelaOrdenada);

// Questão 4 - Ordem alfabetica
const ordemAlfabetica = (ordenar) => {
	return ordenar.sort((a, b) => a.time.localeCompare(b.time));
};
const tabelaEmOrdemAlfabetica = ordemAlfabetica(tabelaOrdenada);
criarArquivo('tabela_ordem_alfabetica.txt', tabelaEmOrdemAlfabetica);

// Questão 5 - Ordem decrescente em número de empates
const ordemDeEmpate = (ordenar) => {
	return ordenar.sort((a, b) => a.empates - b.empates).reverse();
};
const tabelaEmOrdemDeEmpate = ordemDeEmpate(tabelaOrdenada);
criarArquivo('tabela_ordem_empate.txt', tabelaEmOrdemDeEmpate);

// Questão 6 - Ordem decrescente em número de gols feitos
const ordemDeGolsFeitos = (ordenar) => {
	return ordenar
		.sort((a, b) => a['gols feitos'] - b['gols feitos'])
		.reverse();
};
const tabelaEmOrdemDeGolsFeitos = ordemDeGolsFeitos(tabelaOrdenada);
criarArquivo('tabela_ordem_gols_feitos.txt', tabelaEmOrdemDeGolsFeitos);

// Questão 7 - Ordem decrescente em número de gols sofridos
const ordemDeGolsSofridos = (ordenar) => {
	return ordenar
		.sort((a, b) => a['gols sofridos'] - b['gols sofridos'])
		.reverse();
};
const tabelaEmOrdemDeGolsSofridos = ordemDeGolsSofridos(tabelaOrdenada);
criarArquivo('tabela_ordem_gols_sofridos.txt', tabelaEmOrdemDeGolsSofridos);
