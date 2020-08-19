const fs = require('fs');
const csvParser = require('csv-parser')
const stream = fs.createReadStream('houses.csv')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


let conteudo = [];
stream.pipe(csvParser()).on('data', (data) => {
    conteudo.push({
        Id: conteudo.length + 1,
        City: data.city,
        Area: Number(data.area),
        Rooms: Number(data.rooms),
        Bathroom: Number(data.bathroom),
        'Parking Spaces': Number(data['parking spaces']),
        Floor: data.floor == '-' ? 0 : Number(data.floor),
        Animal: data.animal,
        Furniture: data.furniture,
        Hoa: Number(data.hoa),
        'Rent Amount': Number(data['rent amount']) * 100,
        'Property tax': Number(data['property tax']) * 100,
        'Fire Insurance': Number(data['fire insurance']) * 100,
        Total: Number(data.total) * 100
    });
});
//city,area,rooms,bathroom,parking spaces,floor,animal,furniture,hoa,rent amount,property tax,fire insurance,total
stream.on('end', () => {
    const csvWriter = createCsvWriter({
        path: 'houses_saida.csv',
        header: [
            {id: 'Id', title: 'Id'},
            {id: 'City', title: 'Cidade'},
            {id: 'Area', title: 'Area'},
            {id: 'Rooms', title: 'Quartos'},
            {id: 'Bathroom', title: 'Banheiro'},
            {id: 'Parking Spaces', title: 'Vagas_de_Garagem'},
            {id: 'Floor', title: 'Andar'},
            {id: 'Animal', title: 'Animal'},
            {id: 'Furniture', title: 'Mobiliado'},
            {id: 'Hoa', title: 'IPTU'},
            {id: 'Rent Amount', title: 'Aluguel'},
            {id: 'Property tax', title: 'Condominio'},
            {id: 'Fire Insurance', title: 'Seguro_Incendio'},
            {id: 'Total', title: 'Total'}
        ]
    });
    
    csvWriter.writeRecords(conteudo);
})

