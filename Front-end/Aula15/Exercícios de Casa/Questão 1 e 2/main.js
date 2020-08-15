const adultos = document.querySelector('.qtdAdultos');
const criancas = document.querySelector('.qtdCriancas');
const button = document.querySelector('button');
const text = document.querySelectorAll('.text > span');
const select = document.querySelector('select');
adultos.value = 0;
criancas.value = 0;

button.addEventListener('click', () => {
    const qtdAdultos = adultos.valueAsNumber;
    const qtdCriancas = criancas.valueAsNumber; 
    let carne = 0, coracao = 0, cerveja = 0, refrigerante = 0;
    let opcaoCerveja;

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

    if (select.value === 'garrafa600') {
        opcaoCerveja = 0.6;
        text[2].innerHTML = `${Math.floor(cerveja / opcaoCerveja) + 1} garrafas;<br>`
    } else if (select.value === 'latao') {
        opcaoCerveja = 0.475;
        text[2].innerHTML = `${Math.floor(cerveja / opcaoCerveja) + 1} latões;<br>`
    } else if (select.value === 'longNeck') {
        opcaoCerveja = 0.330;
        text[2].innerHTML = `${Math.floor(cerveja / opcaoCerveja) + 1} long necks;<br>`
    } else if (select.value === 'latinha') {
        opcaoCerveja = 0.269;
        text[2].innerHTML = `${Math.floor(cerveja / opcaoCerveja) + 1} latinhas;<br>`
    }

    text[0].innerHTML = `${carne}g;<br>`
    text[1].innerHTML = `${coracao}g;<br>`
    text[3].innerHTML = `${refrigerante}L.`
})