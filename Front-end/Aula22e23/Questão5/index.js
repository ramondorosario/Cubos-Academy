const cidade = document.querySelector('.cidade')
const img = document.querySelectorAll('.imagem');
const dia = document.querySelectorAll('.dia');
const descricao = document.querySelectorAll('.descrição');
const min = document.querySelectorAll('.minimo');
const max = document.querySelectorAll('.maximo')

fetch('https://extreme-ip-lookup.com/json/')
    .then((resposta) => {
        return resposta.json();
    })
        .then((respostaJson) => {
            cidade.innerText = `${respostaJson.city}, ${respostaJson.region}`
            
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${respostaJson.lat}&lon=${respostaJson.lon}&units=metric&lang=pt_BR&appid=47b16d41765388e1d2e251b373b570c0`)
                .then((resposta) => {
                    return resposta.json();
                })
                    .then((resposta) => { 
                        for (let i = 0; i < resposta.daily.length; i++) {
                            img[i].setAttribute('src', `http://openweathermap.org/img/wn/${resposta.daily[i].weather[0].icon}@2x.png`)
                            if (i === 0) {
                                dia[i].innerText = 'Hoje'
                            } else if (i === 1) {
                                dia[i].innerText = 'Amanhã'
                            } else {
                                dia[i].innerText = `Daqui a ${i} dias`
                            }
                            min[i].innerText = resposta.daily[i].temp.min;
                            max[i].innerText = resposta.daily[i].temp.max;
                            descricao[i].innerText = resposta.daily[i].weather[0].description;                            
                        }                       
                    })
        })