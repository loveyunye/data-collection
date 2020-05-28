const UserModel = require('../models/userModel');

class UserCtl {
  async create(ctx) {
    const info = UserCtl.verify(ctx);
    try {
      const user = await UserModel.create(info);
      ctx.status = 201;
      ctx.body = user;
    } catch (error) {
      ctx.throw(400, '用户名已经被注册过');
    }
  }

  async findSelf(ctx) {
    const user = ctx.session;
    ctx.body = user;
  }

  async login(ctx) {
    const info = UserCtl.verify(ctx);
    const user = await UserModel.findOne({
      where: info,
    });
    if (!user) {
      ctx.throw(404, '账号密码错误或用户不存在');
    }
    ctx.body = user;
    ctx.status = 200;
    ctx.session = user.dataValues || user;
  }

  async logout(ctx) {
    ctx.session = null;
    ctx.status = 204;
  }

  async update(ctx) {
    const id = ctx.params.userId;
    const user = await UserModel.ensureExist(id);
    if (!user) {
      ctx.throw(404, '该用户不存在');
    }
    try {
      const updated = await user.update(ctx.request.body);
      ctx.body = updated;
    } catch (error) {
      ctx.throw(400, '用户名已经被注册过');
    }
  }

  static verify(ctx) {
    ctx.verifyParams({
      username: 'string',
      password: 'string',
    });
    return ctx.request.body;
  }

  async delete(ctx) {
    const id = ctx.params.userId;
    const user = await UserModel.ensureExist(id);
    if (!user) {
      ctx.throw(404, '该用户不存在');
    }
    await user.destroy({ force: true });
    ctx.status = 204;
  }
}

module.exports = new UserCtl();
