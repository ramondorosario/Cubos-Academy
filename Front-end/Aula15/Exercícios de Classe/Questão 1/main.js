const altura = document.querySelector('.altura');
const peso = document.querySelector('.peso');
const button = document.querySelector('button');
const text = document.querySelector('.text');

button.addEventListener('click', () => {
    const imc = (peso.valueAsNumber / altura.valueAsNumber**2).toFixed(1);
    if (imc < 18.5) {
        text.innerHTML = `Valor do IMC é ${imc}. Você está abaixo do peso.`
    } else if (imc < 25) {
        text.innerHTML = `Valor do IMC é ${imc}. Seu peso está normal.`
    } else if (imc < 30) {
        text.innerHTML = `Valor do IMC é ${imc}. Você está com sobrepeso.`
    } else if (imc < 35) {
        text.innerHTML = `Valor do IMC é ${imc}. Obesidade grau 1.`
    } else if (imc < 40) {
        text.innerHTML = `Valor do IMC é ${imc}. Obesidade grau 2.`
    } else {
        text.innerHTML = `Valor do IMC é ${imc}. Obesidade grau 3.`
    }
})