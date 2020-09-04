const button = document.querySelector('button');
const texto = document.querySelector('.citacao');

button.addEventListener('click', () => {
    setTimeout(() => {
        fetch('https://programming-quotes-api.herokuapp.com/quotes/random/lang/en')
        .then(value => {
            const resposta = value.json();
            return resposta
        })
            .then(resposta => {
                texto.innerText = `${resposta.en} - ${resposta.author}`
            })
    }, 500)
})