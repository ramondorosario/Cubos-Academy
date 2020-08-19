const fs = require('fs');
const csvParser = require('csv-parser');
const stream = fs.createReadStream('breweries.csv');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

let conteudo = [];
stream.pipe(csvParser()).on('data', (data) => {
    conteudo.push({
        Id: Number(data.id),
        Name: data.name.trim().replace(/['`]/g, ''),
        City: data.city.trim(),
        State: data.state.trim()
    });
})

stream.on('end', () => {
    
const csvWriter = createCsvWriter({
    path: 'cervejarias_saida.csv',
    header: [
        {id: 'Id', title: 'id'},
        {id: 'Name', title: 'Nome'},
        {id: 'City', title: 'Cidade'},
        {id: 'State', title: 'Estado'}
    ]
});

csvWriter.writeRecords(conteudo)
})