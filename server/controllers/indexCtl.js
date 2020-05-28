const apiManage = require('../service/apiManage');
const Compose = require('../models/compose');

// 公共controller
class IndexCtl {
  async getData(ctx) {
    const key = ctx.params.key;
    const compose = await Compose.findOne({
      where: {
        key,
      },
    });
    const isCompose = compose ? true : false;
    try {
      const res = await apiManage.getData(
        isCompose ? JSON.parse(compose.dataValues.code) : key,
      );
      ctx.body = res;
    } catch (err) {
      ctx.throw(400, err.message);
    }
  }
}

module.exports = new IndexCtl();
