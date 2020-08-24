const cabeca = document.querySelector('.cabeca');
const tronco = document.querySelector('.tronco')
const bracoDireito = document.querySelector('.braco.direito');
const bracoEsquerdo = document.querySelector('.braco.esquerdo');
const pernaDireita = document.querySelector('.perna.direito');
const pernaEsquerda = document.querySelector('.perna.esquerdo');
const container = document.querySelector('.container-forca')


const buttons = document.querySelectorAll('button');
let txtTela = document.querySelector('.letras');
const listaPalavras = ['celular', 'palavra', 'academy', 'pular', 'muro', 'varal', 'bebida', 'martelo', 'computador', 'internet'];
let palavra;
let palavraAnterior;
let letraEscolhida = '';
let certo = 0, errado = 0;
let jogando = false;
let chutes = [];
let letraTeclado = '';


// Coloca o evento click em todos os botoes e identifica a letra quando o botao for clicado
for (let i = 0; i < buttons.length; i++) {
    buttons[i].setAttribute('value', `${i}`);
    buttons[i].setAttribute('onclick','botao(value)'); 
} 

const botao = (value) => {
    const alfabeto = 'abcdefghijklmnopqrstuvwxyz'
    letraEscolhida = alfabeto[value];
    verificarChutes(letraEscolhida)
}

// Adiciona o evento keypress
addEventListener('keypress', event => {
    let letraTeclado = event.key;
    verificarChutes(letraTeclado)
})

// Ocultar o desenho
const ocultarDesenho = () => {
    cabeca.classList.remove('cabeca');
    tronco.classList.remove('tronco');
    bracoDireito.classList.remove('braco');
    bracoEsquerdo.classList.remove('braco');
    pernaDireita.classList.remove('perna');
    pernaEsquerda.classList.remove('perna');
}

// Inicia o jogo
const iniciar = () => {
    ocultarDesenho();
    sortearPalavra();
}

// Sorteio da palavra
const sortearPalavra = () => {    
    let valor = Math.round((Math.random()) * listaPalavras.length - 1);
    if (valor === -1) valor = 0;
    palavra = listaPalavras[valor];
    certo = 0;
    errado = 0; 
    if (palavraAnterior === palavra) {
        return sortearPalavra();
    }
    prepararTela(palavra);   
}

// Ajusta a quantidade de underline pra cada letra e inicia o jogo
const prepararTela = (palavra) => {
    letra = document.querySelectorAll('.letras div');
    if (jogando) {
        for (let i = letra.length - 1; i >= 0; i--) {
            letra[i].remove()
        }
    }    
    for (let i = 0; i < palavra.length; i++){
        let div = document.createElement('div');
        txtTela.append(div); 
        letra = document.querySelectorAll('.letras div')[i]
        letra.innerText = ' ';
        letra.classList.add('letra');
    }
}

// Verificar letras que ja foram chutadas
const verificarChutes = (letraEscolhida) => {
    if (chutes.includes(letraEscolhida)) {        
        alert('Você ja chutou essa letra! Tente outra!');
        return
    }  
    chutes.push(letraEscolhida);
    exibir(letraEscolhida);
}

// Exibe a letra na tela caso acerte ou exibe o desenho em caso de erro
const exibir = (letraEscolhida) => {
    let array = [];
    let x = palavra.indexOf(letraEscolhida);    
    while(x != -1) {
        array.push(x);
        x = palavra.indexOf(letraEscolhida, x + 1);        
    }
    if(array.length) {
        for(let i = 0; i < array.length; i++) {
            const letra = document.querySelectorAll('.letras div')[array[i]];
            letra.innerText = letraEscolhida;   
            certo++        
        }       
    } else {
        errado++
        switch (errado) {
            case 1:
                cabeca.classList.toggle('cabeca');
                break;
            case 2:
                tronco.classList.toggle('tronco');               
                break;
            case 3:               
                bracoDireito.classList.toggle('braco');
                bracoDireito.style.transform = 'rotate(45deg)';
                break;
            case 4:               
                bracoEsquerdo.classList.toggle('braco');
                bracoEsquerdo.style.transform = 'rotate(-45deg)';
                break
            case 5: 
                pernaDireita.classList.toggle('perna');
                pernaDireita.style.transform = 'rotate(45deg)';
                break;
            case 6:
                pernaEsquerda.classList.toggle('perna');
                pernaEsquerda.style.transform = 'rotate(-45deg)';                       
        }
    }
    ganhouPerdeu(certo,errado);
}

// Confere o progresso da pessoa durante o jogo
const ganhouPerdeu = (certo, errado) => {
    if(certo === palavra.length) { 
        jogando = true;
        chutes = [];
        palavraAnterior = palavra;
        letraTeclado = '';
        ocultarDesenho();
        sortearPalavra();
        alert('Parabéns! Você ganhou!');
    } else if (errado === 6) {  
        jogando = true; 
        chutes = [];
        palavraAnterior = palavra;      
        letraTeclado = '';  
        ocultarDesenho();        
        sortearPalavra();
        alert('Que pena, você perdeu!');     
        alert(`A palavra era: ${palavraAnterior}`);
    }
}
iniciar();