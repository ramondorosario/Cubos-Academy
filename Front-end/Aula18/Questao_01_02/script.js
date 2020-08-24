const button = document.querySelectorAll('button');
const quadrado = document.querySelector('.quadrado');
let array = [];
let escolhido;
let cont = 0;


iniciar();

button[0].addEventListener('click', () => {
	resultado(0);
});
button[1].addEventListener('click', () => {
	resultado(1)
});
button[2].addEventListener('click', () => {
	resultado(2)
});


// Funções
const resultado = (x) => {
	if(button[x].innerText === escolhido) {
		alert('Parabéns! Você acertou!')
		cont++
	} else {
		alert ('Errrou!')	
	}
	if (cont === 10) {
		alert('Nossa! Você acertou 10 seguidas!!')
	}
	iniciar();
}

function iniciar () {
	array = []
	for (let i = 0; i < button.length; i++) {
		array.push(gerarCorAleatoria());
		button[i].innerText = array[i];
		console.log('botao' + i + array[i])
	}
	escolhido = escolherElementoAleatorio(array)
	console.log(escolhido)
	quadrado.style.background = escolhido;
}

function gerarNumeroInteiroAleatorio(min, max) {
	// número fracionário aleatório maior ou igual a 0 e menor que 1
	const aleatorioDeBase = Math.random();
	// número fracionário aleatório maior ou igual a 0 e menor que (max - min + 1)
	const aleatorioFracionario = Math.random() * (max - min + 1);
	// número inteiro aleatório maior ou igual a 0 e menor ou igual a (max - min)
	// Math.trunc tira a parte fracionária de um número: 0,5 vira 0, 1,25 vira 1, etc
	const aleatorioInteiro = Math.trunc(aleatorioFracionario);
	// número inteiro aleatório maior ou igual a min e menor ou igual a max
	return min + aleatorioInteiro;
}

function gerarCorAleatoria() {
	const vermelho = gerarNumeroInteiroAleatorio(0, 255);
	const verde = gerarNumeroInteiroAleatorio(0, 255);
	const azul = gerarNumeroInteiroAleatorio(0, 255);
	
	return "rgb(" + vermelho + ", " + verde + ", " + azul + ")";
}

function escolherElementoAleatorio(array) {
	return array[gerarNumeroInteiroAleatorio(0, array.length - 1)]
}