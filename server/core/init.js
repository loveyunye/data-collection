const routing = require('../routes');
const error = require('koa-json-error');
const body = require('koa-body');
const Router = require('koa-router');
const parameter = require('koa-parameter');
const cross = require('@koa/cors');
var historyApiFallback = require('koa-history-api-fallback');
const isDev = process.env.NODE_ENV === 'prod' ? false : true;
const koaStatic = require('koa-static');
const path = require('path');
const session = require('koa-session');
const Store = require('../store/session');
const redis = require('./redis');

// 设置外键
require('../models/initDB');
class InitManage {
  static InitApp(app) {
    InitManage.app = app;
    InitManage.configMiddleware();
    InitManage.loadRouters();
    InitManage.loadHistory();
  }
  // 设置history模式
  static loadHistory() {
    const { app } = InitManage;
    app.use(
      historyApiFallback({
        verbose: false,
        index: '/index.html',
        htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
      }),
    );
    app.use(koaStatic(path.join(__dirname, '../../dist/')));
  }
  static configMiddleware() {
    const { app } = InitManage;
    // 增加跨域处理
    app.use(cross({ credentials: true }));
    // 增加session中间件
    app.keys = process.env.COOKIE_KEY.split('|');
    app.keys = app.use(
      session(
        {
          maxAge: process.env.COOKIE_MAX_AGE * 1000,
          key: process.env.COOKIE_NAME,
          store: new Store(redis),
          signed: false,
        },
        app,
      ),
    );
    // 错误处理
    app.use(
      error({
        postFormat: (e, { stack, ...rest }) =>
          isDev ? { stack, ...rest } : rest,
      }),
    );
    // 请求体解析插件
    app.use(body({ multipart: true }));
    // 参数校验
    app.use(parameter(app));
  }

  static loadRouters() {
    const apiRouter = new Router({ prefix: '/api' });
    const { app } = InitManage;
    routing(apiRouter);
    app.use(apiRouter.routes());
  }
}

module.exports = InitManage;
