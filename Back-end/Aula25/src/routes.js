const Router = require('koa-router');

const router = new Router();

const Autores = require('./controllers/autores');
const Posts = require('./controllers/posts');
const Autenticar = require('./controllers/auth');
const Password = require('./middlewares/encrypt');
const Session = require('./middlewares/session');

router.post('/auth', Autenticar);

router.post('/autor', Password.encrypt, Autores.criarAutor);
router.get('/autor/:id', Session.verify, Autores.exibirAutor);
router.get('/autores', Session.verify, Autores.exibirAutores);
router.delete('/autor/:id', Session.verify, Autores.deletarAutor);
router.put('/autor/:id', Session.verify, Autores.atualizarAutor);

router.post('/posts', Session.verify, Posts.criarPost);
router.get('/posts/:id', Session.verify, Posts.exibirPost);
router.get('/posts', Session.verify, Posts.exibirPosts);
router.put('/posts/:id', Session.verify, Posts.atualizarPost);
router.delete('/posts/:id', Session.verify, Posts.deletarPost);

module.exports = router;
