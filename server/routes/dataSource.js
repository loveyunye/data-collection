const KoaRouter = require('koa-router');
const router = new KoaRouter({ prefix: '/dataSource' });
const controller = require('../controllers/dataSourceCtl');

const Auth = require('../middleWare/auth');

router.use(new Auth().VerifyAuth);

const { find, findAll, create, update, delete: del, test } = controller;

router.get('/', findAll);
router.get('/:key', find);
router.post('/', create);
router.patch('/:dbId', update);
router.delete('/:dbId', del);

router.post('/test', test);

module.exports = router;
