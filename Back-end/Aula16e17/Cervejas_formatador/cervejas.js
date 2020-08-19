const fs = require('fs');
const csvParser = require('csv-parser');
const stream = fs.createReadStream('beers.csv');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

let conteudo = [];
stream.pipe(csvParser()).on('data', (data) => {
    conteudo.push({
        id: Number(data.id),
        abv: Number(data.abv).toFixed(3),
        ibu: Number(data.ibu),
        national_id: Number(data.national_id),
        name: data.name.trim().replace(/['`]/g, ''),
        style: data.style.trim(),
        brewery_id: Number(data.brewery_id),
        ounces: Number(data.ounces)
    })
})

stream.on('end', () => {
    const csvWriter = createCsvWriter({
        path: 'cervejas_saida.csv',
        header: [
            {id: 'id', title: 'id'},
            {id: 'abv', title: 'abv'},
            {id: 'ibu', title: 'ibu'},
            {id: 'national_id', title: 'national_id'},
            {id: 'name', title: 'name'},
            {id: 'style', title: 'style'},
            {id: 'brewery_id', title: 'brewery_id'},
            {id: 'ounces', title: 'ounces'}
        ]
    });
    csvWriter.writeRecords(conteudo)
});
