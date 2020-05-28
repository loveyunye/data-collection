const ApiModel = require('../models/apiModel');
const apiManage = require('../service/apiManage');
const ApisBridge = require('../models/apisBridge');
const { getUuid } = require('../utils');
const { apiType } = require('../config/enum');

class ApiCTL {
  async findALL(ctx) {
    const projectId = ctx.query.projectId;
    const condition = {
      order: [['updatedAt', 'DESC']],
    };
    projectId
      ? (condition.where = {
          projectId,
        })
      : null;
    const res = await ApiModel.findAll(condition);
    ctx.body = res;
  }

  async getData(ctx) {
    const key = ctx.params.key;
    try {
      const res = await apiManage.getData(key);
      ctx.body = res;
    } catch (err) {
      ctx.throw(400, err.message);
    }
  }

  async test(ctx) {
    const { type, code, url } = ctx.request.body;
    let result;
    try {
      switch (type) {
        case 'static':
          result = await apiManage.getStatic(code);
          break;
        case 'sql':
          result = await apiManage.getSql(ctx.request.body);
          break;
        case 'url':
          result = await apiManage.getUrl(url);
          break;
      }
      ctx.body = result;
    } catch (err) {
      ctx.throw(400, err.message);
    }
  }

  async update(ctx) {
    ApiCTL.verifyApiInfo(ctx);
    const id = ctx.params.apiId;
    const api = await ApiModel.ensureExist(id);
    if (!api) {
      ctx.throw(404, '该api不存在');
    }
    const updated = await api.update(ctx.request.body);
    ctx.body = updated;
  }

  async create(ctx) {
    const apiInfo = ApiCTL.verifyApiInfo(ctx);
    Object.keys(apiInfo).forEach((key) => {
      if (!apiInfo[key]) {
        delete apiInfo[key];
      }
    });
    const key = getUuid();
    const api = await ApiModel.create({
      ...Object.assign(apiInfo, {
        key,
      }),
    });
    ctx.status = 201;
    ctx.body = api;
  }

  async delete(ctx) {
    const id = ctx.params.apiId;
    const api = await ApiModel.ensureExist(id);
    if (!api) {
      ctx.throw(404, '该api不存在');
    }
    const apisBridges = await ApisBridge.findAll({
      where: {
        apiKey: api.dataValues.key,
      },
    });
    if (apisBridges.length > 0) {
      ctx.throw(400, '无法删除，该api正被某些组合使用');
    }
    await api.destroy({ force: true });
    ctx.status = 204;
  }

  static verifyApiInfo(ctx) {
    const { type } = ctx.request.body;
    const isUrl = type === 'url' ? true : false;
    const isSql = type === 'sql' ? true : false;
    const paramsObj = {
      type: {
        type: 'enum',
        values: Object.values(apiType),
      },
      name: 'string',
      description: 'string',
    };
    isSql ? (paramsObj.sqlId = { type: 'int' }) : null;
    isUrl
      ? (paramsObj.url = { type: 'string' })
      : (paramsObj.code = { type: 'string' });
    ctx.verifyParams(paramsObj);
    return ctx.request.body;
  }
}

module.exports = new ApiCTL();
