const fs = require('fs');
let texto = [];
let guardar = [];
let guardar2 = [];

const leitorEnderecos = () => {
    let texto = fs.readFileSync('enderecos.txt').toString().split('\n');
    let lista = [];
    let guardar = [];

    for (let i = 0; i < texto.length; i++) {
        if(texto[i] !== '---') {
            guardar.push(texto[i].trim())
        } else if (texto[i] === '---') {
            lista.push(guardar);
            guardar = [];
        }
    }
    lista.push(guardar);
    return lista
}

fs.readFile('cartas.txt', (err, data) => {
    texto.push(data.toString().split('\n'));
    const enderecos = leitorEnderecos();
    for (let i = 0; i < texto.length; i++){
        for (let j = 0; j < texto[i].length; j++) {
            if( texto[i][j] !== '---') {
                guardar2.push(texto[i][j]);
            } else if (texto[i][j] === '---'){
                guardar.push(guardar2);
                guardar2 = [];                
            }            
        }
        guardar.push(guardar2);
    }
    let resultado = '';
    for (let i = 0; i < guardar.length; i++) {
        let endereco;
        for (let j = 0; j < enderecos.length; j++){
            if (guardar[i][1].includes(enderecos[j][0])) {
                endereco = enderecos[j][1];
                break;
            }
        }
        resultado += `[INICIO DA MENSAGEM]\nRemetente: ${guardar[i][0]}\nDestinatário: ${guardar[i][1]}\nEndereço: ${endereco}\nMensagem: ${guardar[i][2]}\n[FIM DA MENSAGEM]\n`;        
    }
    fs.writeFile('resultado.txt', resultado,(err) => {
        if (err) {
            console.log(err);
        }
    })
});

