// Questão 1
const input = document.querySelector('input');
const button = document.querySelector('button');
const text = document.querySelector('.text');

button.addEventListener('click', () => {
    const entrada = input.value;
    //alterar o nome da função que quer executar
    questao7(entrada);
})

// Questão 2
const questao2 = (entrada) => {
    if (entrada.includes('desenvolvimento')) {
        alert('Sim')
    } else {
        alert('Não')
    }
}

// Questão 3
const questao3 = (entrada) => {
    const textoTratado = entrada.trim().toLowerCase();
    text.innerHTML = textoTratado;
}

// Questão 4
const questao4 = (entrada) => {
   let textoTratado = entrada.replace(/[.-]/g, '')
   text.innerHTML = textoTratado;
}

//Exercícios de casa
// Questão 5
const questao5 = (entrada) => {
    const guardar = entrada.split(' ');
    let texto = '', letraMaiusc;
    for (let i = 0; i < guardar.length; i++) {
        letraMaiusc = guardar[i][0].toUpperCase();
        texto += `${guardar[i].replace(guardar[i][0], letraMaiusc)} `
    }
    text.innerHTML = texto;
}

// Questão 6
const questao6 = (entrada) => {
    let guardar = entrada.split(' ');
    let textoTratado = '';
    for (let i = guardar.length - 1; i >= 0; i--) {
        textoTratado += `${guardar[i]} `
    }
    text.innerHTML = textoTratado;
}

// Questão 7
const questao7 = (entrada) => {
    let textoTratado = entrada.replace(/muito/gi, 'MUITO');    
    text.innerHTML = textoTratado;
}

// Questão 8
const questao8 = (entrada) => {
    const numeros = entrada.trim().split(' ');
    const ultimos4Digitos = numeros[numeros.length - 1];
    const textoTratado = ultimos4Digitos.padStart('19', '**** ')
  
    text.innerHTML = textoTratado;
}

// Questão 9
const questao9 = (entrada) => {
    const primeiros5 = entrada.slice(0,5);
    const cep = primeiros5 + entrada.replace(primeiros5, '-')

    text.innerHTML = cep;
}

// Questão 10
const questao10 = (entrada) => {
    let numero = entrada.trim();
    let ultimos4Digitos;
    let textoTratado;

    if (numero.length === 8) {
        ultimos4Digitos = numero.slice(4);        
        textoTratado = `9${numero.replace(ultimos4Digitos,'-') + ultimos4Digitos}`;

    } else if (numero.length === 9) {
        ultimos4Digitos = numero.slice(5);        
        textoTratado = `${numero.replace(ultimos4Digitos,'-') + ultimos4Digitos}`;
        
    } else if (numero.length === 11) {
        let ddd = numero.slice(0, 2);
        ultimos4Digitos = numero.slice(7);        
        textoTratado = `(${ddd}) ${numero.slice(2,7)}-${ultimos4Digitos}`

    } else if (numero.length === 10) {
        let ddd = numero.slice(0, 2);
        ultimos4Digitos = numero.slice(6);        
        textoTratado = `(${ddd}) 9${numero.slice(2,6)}-${ultimos4Digitos}`
    } 
    text.innerHTML = textoTratado;
}