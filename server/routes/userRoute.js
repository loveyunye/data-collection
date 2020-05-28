const KoaRouter = require('koa-router');
const router = new KoaRouter({ prefix: '/user' });
const controller = require('../controllers/userCtl');
const Auth = require('../middleWare/auth');

const { create, update, delete: del, findSelf } = controller;

router.post('/', create);
router.patch('/:userId', update);
router.delete('/:userId', del);
router.get('/', new Auth().VerifyAuth, findSelf);

module.exports = router;
