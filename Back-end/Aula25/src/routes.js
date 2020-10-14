const Router = require('koa-router');

const router = new Router();

const Autores = require('./controllers/autores');
const Posts = require('./controllers/posts');
const autenticar = require('./controllers/auth');
const password = require('./middlewares/encrypt');

router.post('/auth', autenticar);

router.post('/autor', password.encrypt, Autores.criarAutor);
router.get('/autor/:id', Autores.exibirAutor);
router.get('/autores', Autores.exibirAutores);
router.delete('/autor/:id', Autores.deletarAutor);
router.put('/autor/:id', Autores.atualizarAutor);

router.post('/posts', Posts.criarPost);
router.get('/posts/:id', Posts.exibirPost);
router.get('/posts', Posts.exibirPosts);
router.put('/posts/:id', Posts.atualizarPost);
router.delete('/posts/:id', Posts.deletarPost);

module.exports = router;
