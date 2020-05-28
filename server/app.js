const InitApp = require('./core/init');
const KOA = require('koa');
const app = new KOA();

InitApp.InitApp(app);
app.listen(3030);
