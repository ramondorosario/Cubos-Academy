const Router = require('koa-router');
const router = new Router();

const exibirCorrentistas = require('./controllers/exibirCorrentistas').exibirCorrentistas;
const adicionarCorrentista = require('./controllers/adicionarCorrentista');
const atualizarCadastro = require('./controllers/atualizarCadastro');
const exibirCorrentista = require('./controllers/exibirCorrentista');
const deletarCorrentista = require('./controllers/deletarCorrentista');

router.get('/correntistas', exibirCorrentistas);
router.get('/correntistas/:id', exibirCorrentista)
router.post('/correntistas', adicionarCorrentista);
router.put('/correntistas/:id', atualizarCadastro);
router.delete('/correntistas/:id', deletarCorrentista);

module.exports = router;