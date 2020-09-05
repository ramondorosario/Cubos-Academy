const estadoSigla = {
    "Acre": "AC",
    "Alagoas": "AL",
    "Amapá": "AP",
    "Amazonas": "AM",
    "Bahia": "BA",
    "Ceará": "CE",
    "Distrito Federal": "DF",
    "Espírito Santo": "ES",
    "Goiás": "GO",
    "Maranhão": "MA",
    "Mato Grosso": "MT",
    "Mato Grosso do Sul": "MS",
    "Minas Gerais": "MG",
    "Pará": "PA",
    "Paraíba": "PB",
    "Paraná": "PR",
    "Pernambuco": "PE",
    "Piauí": "PI",
    "Rio de Janeiro": "RJ",
    "Rio Grande do Norte": "RN",
    "Rio Grande do Sul": "RS",
    "Rondônia": "RO",
    "Roraima": "RR",
    "Santa Catarina": "SC",
    "São Paulo": "SP",
    "Sergipe": "SE",
    "Tocantins": "TO"
};

const elementoCidade = document.querySelector('.cidade');

const fetchJson = (url) => {
    return fetch(url).then(resposta => resposta.json());
};

fetchJson('https://extreme-ip-lookup.com/json/')
    .then(resposta => {
        const cidade = resposta.city;
        const estado = resposta.region;

        elementoCidade.innerText = `${cidade}, ${estado}`;

        fetchJson(`https://brasil.io/api/dataset/covid19/caso/data/?format=json&city=${cidade}&state=${estadoSigla[estado]}`)
            .then (resposta => {
                const ol = document.querySelector('ol');
                const totalCasos = document.querySelector('.totalCasos')
                totalCasos.innerText = resposta.results[0].confirmed;

                const lista = resposta.results;
                for (const item of lista) {
                    const li = document.createElement('li'); 

                    const data = document.createElement('div');
                    data.classList.add('data');
                    const dataFormatada = item.date.split('-').reverse().join('/');
                    data.innerText = dataFormatada;
                    li.append(data);

                    const casos = document.createElement('div');
                    casos.classList.add('casos'); 
                    casos.innerText = item.confirmed;
                    li.append(casos); 
                    
                    ol.append(li)
                }  
            })
    })