class Auth {
  async VerifyAuth(ctx, next) {
    const { scope } = ctx.session;
    if (typeof scope !== 'number') {
      ctx.throw(401, '未登录或session过期');
    }
    await next();
  }
}

module.exports = Auth;
