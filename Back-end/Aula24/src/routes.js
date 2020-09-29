const Router = require('koa-router');

const router = new Router();

const { encurta } = require('./controllers/encurta');
const encurtaInformado = require('./controllers/encurta-informado');
const redirecionar = require('./controllers/redirecionar');

router.post('/encurta', encurta);
router.post('/encurta/:id', encurtaInformado);
router.get('/:id', redirecionar);

module.exports = router;
