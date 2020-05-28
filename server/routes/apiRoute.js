const KoaRouter = require('koa-router');
const router = new KoaRouter({ prefix: '/apiSource' });
const controller = require('../controllers/apiCtl');
const Auth = require('../middleWare/auth');

router.use(new Auth().VerifyAuth);

const { findALL, getData, create, update, delete: del, test } = controller;

router.get('/', findALL);
router.get('/:key', getData);
router.post('/', create);
router.post('/test', test);
router.patch('/:apiId', update);
router.delete('/:apiId', del);

module.exports = router;
