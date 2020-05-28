const KoaRouter = require('koa-router');
const router = new KoaRouter({ prefix: '/compose' });
const controller = require('../controllers/composeCtl');

const Auth = require('../middleWare/auth');

router.use(new Auth().VerifyAuth);

const { findALL, getData, create, update, delete: del, test } = controller;

router.get('/', findALL);
router.get('/:key', getData);
router.post('/', create);
router.post('/test', test);
router.patch('/:id', update);
router.delete('/:id', del);

module.exports = router;
