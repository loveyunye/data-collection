const KoaRouter = require('koa-router');
const router = new KoaRouter({ prefix: '/project' });
const controller = require('../controllers/projectCtl');

const { findALL, create, delete: del, update } = controller;

router.get('/', findALL);
router.post('/', create);
router.patch('/:id', update);
router.delete('/:id', del);

module.exports = router;
