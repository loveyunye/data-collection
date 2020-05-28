const KoaRouter = require('koa-router');
const router = new KoaRouter();
const controller = require('../controllers/indexCtl');
const UserController = require('../controllers/userCtl');

const { getData } = controller;
const { login, logout } = UserController;

router.get('/:key', getData);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
