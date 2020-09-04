const button = document.querySelector('button');
const text = document.querySelector('.citacao');

button.addEventListener('click', () => {
    fetch('https://programming-quotes-api.herokuapp.com/quotes/random/lang/en')
        .then((resposta) => {
           return resposta.json()
        })
            .then((respostaJson) => {
                text.innerText = `${respostaJson.en} - ${respostaJson.author}`
            })    
})
