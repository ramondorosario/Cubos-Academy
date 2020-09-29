const correntistas = require('../controllers/exibirCorrentistas').correntistas;
const imprimir = require('../utils/code');

const exibirCorrentista = (ctx) => {
    const id = ctx.params.id;
    const correntista = correntistas[id];

    if(!correntista) return imprimir(ctx, 404, 'correntista não encontrado');

    imprimir(ctx, 200, 'correntista encontrado', 'correntista', correntista);    
}

module.exports = exibirCorrentista;