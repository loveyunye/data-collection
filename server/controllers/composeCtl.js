const Compose = require('../models/compose');
const ApisBridge = require('../models/apisBridge');
const apiManage = require('../service/apiManage');
const { getUuid } = require('../utils');

class ComposeCtl {
  async findALL(ctx) {
    const projectId = ctx.query.projectId;
    const res = await Compose.findAll(
      projectId
        ? {
            where: {
              projectId,
            },
          }
        : {},
    );
    ctx.body = res;
  }

  async getData(ctx) {
    const key = ctx.params.key;
    const compose = await Compose.findOne({
      where: {
        key,
      },
    });
    if (!compose) {
      ctx.throw(404, '该组合不存在');
    }
    const request = await apiManage.getData(
      JSON.parse(compose.dataValues.code),
    );
    ctx.body = request;
  }

  async update(ctx) {
    const composeInfo = ComposeCtl.verifyInfo(ctx, false);
    const id = ctx.params.id;
    const compose = await Compose.ensureExist(id);
    if (!compose) {
      ctx.throw(404, '该组合不存在');
    }
    // 修改过code需要处理bridge
    if (composeInfo.code) {
      let parseCode;
      try {
        parseCode = JSON.parse(composeInfo.code);
      } catch (err) {
        ctx.throw(400, `json解析错误：${err.message}`);
      }
      await ApisBridge.delByCompose(compose.dataValues.key);
      await ComposeCtl.handlerBridge(compose.dataValues.key, parseCode);
    }
    const updated = await compose.update(composeInfo);
    ctx.body = updated;
  }

  async create(ctx) {
    const composeInfo = ComposeCtl.verifyInfo(ctx);
    const key = getUuid();
    let parseCode;
    try {
      parseCode = JSON.parse(composeInfo.code);
    } catch (err) {
      ctx.throw(400, `json解析错误：${err.message}`);
    }
    // 处理api和compose之间的联系
    await ComposeCtl.handlerBridge(key, parseCode);
    const compose = await Compose.create({
      ...Object.assign(composeInfo, {
        key,
      }),
    });
    ctx.status = 201;
    ctx.body = compose;
  }

  async test(ctx) {
    const { code } = ctx.request.body;
    try {
      const parseCode = JSON.parse(code);
      const request = await apiManage.getData(parseCode);
      ctx.body = request;
    } catch (error) {
      ctx.throw(404, 'json格式解析错误');
    }
  }

  async delete(ctx) {
    const id = ctx.params.id;
    const compose = await Compose.ensureExist(id);
    if (!compose) {
      ctx.throw(404, '该组合不存在');
    }
    await compose.destroy({ force: true });
    ctx.status = 204;
  }

  static async handlerBridge(composeKey, parseCode) {
    if (typeof parseCode === 'object') {
      for (const k in parseCode) {
        await ComposeCtl.handlerBridge(composeKey, parseCode[k]);
      }
    } else {
      await ApisBridge.create({
        apiKey: parseCode.replace(/<%=\s*([^%>]+?)\s*%>/g, (a, b) => b),
        composeKey,
      });
    }
  }

  static verifyInfo(ctx, status = true) {
    ctx.verifyParams({
      name: {
        type: 'string',
        require: status,
      },
      description: {
        type: 'string',
        require: status,
      },
      code: {
        type: 'string',
        required: status,
      },
    });
    return ctx.request.body;
  }
}

module.exports = new ComposeCtl();
