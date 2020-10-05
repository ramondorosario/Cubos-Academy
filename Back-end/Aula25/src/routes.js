const Router = require('koa-router');

const router = new Router();

const { criarAutor } = require('./controllers/criarAutor');
const exibirAutor = require('./controllers/exibirAutor');
const deletarAutor = require('./controllers/deletarAutor');
const atualizarAutor = require('./controllers/atualizarAutor');
const { criarPost } = require('./controllers/criarPost');
const exibirPost = require('./controllers/exibirPost');
const exibirPosts = require('./controllers/exibirPosts');
const atualizarPost = require('./controllers/atualizarPost');
const deletarPost = require('./controllers/deletarPost');
const exibirAutores = require('./controllers/exibirAutores');

router.post('/autor', criarAutor);
router.get('/autor/:id', exibirAutor);
router.get('/autores', exibirAutores);
router.delete('/autor/:id', deletarAutor);
router.put('/autor/:id', atualizarAutor);
router.post('/posts', criarPost);
router.get('/posts/:id', exibirPost);
router.get('/posts', exibirPosts);
router.put('/posts/:id', atualizarPost);
router.delete('/posts/:id', deletarPost);

module.exports = router;
