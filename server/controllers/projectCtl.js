const Project = require('../models/project');
const only = require('only');
const ApiModel = require('../models/apiModel');
const DataSource = require('../models/dataSource');
const Compose = require('../models/compose');

class ProjectCtl {
  async findALL(ctx) {
    const res = await Project.findAll();
    ctx.body = res;
  }

  async create(ctx) {
    ctx.verifyParams({
      name: {
        type: 'string',
      },
    });
    const res = await Project.create(ctx.request.body);
    ctx.body = only(res, 'id name remark');
  }

  async update(ctx) {
    const id = ctx.params.id;
    ctx.verifyParams({
      name: {
        type: 'string',
      },
    });
    if (Number(id) === 1) {
      ctx.throw(400, '公共资源池不能修改');
    }
    const project = await Project.ensureExist(id);
    if (!project) {
      ctx.throw(404, '项目id不存在');
    }
    const updated = await project.update(ctx.request.body);
    ctx.body = updated;
  }

  async delete(ctx) {
    const id = ctx.params.id;
    if (Number(id) === 1) {
      ctx.throw(400, '公共资源池不能删除');
    }
    const project = await Project.ensureExist(id);
    if (!project) {
      ctx.throw(404, '项目id不存在');
    }
    // 校验有没有使用project
    const condition = {
      where: { projectId: id },
    };
    const databases = await DataSource.findAll(condition);
    const apis = await ApiModel.findAll(condition);
    const composes = await Compose.findAll(condition);
    if (databases.length || apis.length || composes.length) {
      ctx.throw(400, '无法删除，该项目下还存留部分数据源、api、组合');
    }
    await project.destroy();
    ctx.status = 204;
  }
}

module.exports = new ProjectCtl();
