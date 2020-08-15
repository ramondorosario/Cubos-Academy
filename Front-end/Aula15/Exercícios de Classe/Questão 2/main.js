const adultos = document.querySelector('.qtdAdultos');
const criancas = document.querySelector('.qtdCriancas');
const button = document.querySelector('button');
const text = document.querySelectorAll('.text > span');
adultos.value = 0;
criancas.value = 0;

button.addEventListener('click', () => {    
    const qtdAdultos = adultos.valueAsNumber;
    const qtdCriancas = criancas.valueAsNumber; 
    let carne = 0, coracao = 0, cerveja = 0, refrigerante = 0;

    if(qtdAdultos === 0 && qtdCriancas === 0) {
        return alert('Erro: informe ao menos um valor.')
    }
    if (qtdAdultos > 0) {
        carne += 300 * qtdAdultos;
        coracao += 100 * qtdAdultos;
        cerveja = 0.5 * qtdAdultos;
        refrigerante += 1 * qtdAdultos;
    };
    if (qtdCriancas > 0) {
        carne += 150 * qtdCriancas;
        coracao += 50 * qtdCriancas;
        refrigerante += .5 * qtdCriancas;
    };
    
    text[0].innerHTML = `${carne}g;`
    text[1].innerHTML = `${coracao}g;`
    text[2].innerHTML = `${Math.floor(cerveja / 0.6) + 1} garrafas de 600ml;`
    text[3].innerHTML = `${refrigerante}L.`
})