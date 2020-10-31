const Router = require('koa-router');

const router = new Router();

const Autores = require('./controllers/autores');
const Posts = require('./controllers/posts');
const Autenticar = require('./controllers/auth');
const Password = require('./middlewares/encrypt');
const Session = require('./middlewares/session');
const Email = require('./middlewares/email');
const Payments = require('./controllers/payment');

router.post('/auth', Autenticar);

router.post('/payment', Session.verify, Email.verify, Payments.payment);

router.get('/autores/:id/confirm/:code', Autores.confirmarEmail);

router.post('/autor', Password.encrypt, Autores.criarAutor);
router.get('/autor/:id', Session.verify, Email.verify, Autores.exibirAutor);
router.get('/autores', Session.verify, Email.verify, Autores.exibirAutores);
router.delete('/autor/:id', Session.verify, Email.verify, Autores.deletarAutor);
router.put('/autor/:id', Session.verify, Email.verify, Autores.atualizarAutor);

router.post('/posts', Session.verify, Email.verify, Posts.criarPost);
router.get('/posts/:id', Session.verify, Email.verify, Posts.exibirPost);
router.get('/posts', Session.verify, Email.verify, Posts.exibirPosts);
router.put('/posts/:id', Session.verify, Email.verify, Posts.atualizarPost);
router.delete('/posts/:id', Session.verify, Email.verify, Posts.deletarPost);

module.exports = router;
