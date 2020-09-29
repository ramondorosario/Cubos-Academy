const correntistas = require("../controllers/exibirCorrentistas").correntistas;
const imprimir = require("../utils/code");

const deletarCorrentista = (ctx) => {
    const id = ctx.params.id;

    if (correntistas[id]) {
        imprimir(ctx, 200, 'correntista deletado', 'correntista', correntistas[id]);
        return correntistas.splice(id, 1);
    };

    imprimir(ctx, 404, 'correntista não encontrado');

}

module.exports = deletarCorrentista;