const DataSource = require('../models/dataSource');
const MySQLClient = require('../service/mysql');
const ApiModel = require('../models/apiModel');
const { dbType } = require('../config/enum');

class DataSourceCtl {
  async findAll(ctx) {
    const projectId = ctx.query.projectId;
    const condition = {
      order: [['updatedAt', 'DESC']],
    };
    projectId
      ? (condition.where = {
          projectId,
        })
      : null;
    const res = await DataSource.findAll(condition);
    ctx.body = res;
  }

  find(ctx) {
    ctx.body = 1;
    ctx.throw(409, 'name not found');
  }

  async update(ctx) {
    ctx.verifyParams({
      type: {
        type: 'enum',
        values: Object.values(dbType),
        required: false,
      },
      name: {
        type: 'string',
        required: false,
      },
      host: {
        type: 'string',
        required: false,
      },
      port: {
        type: 'int',
        required: false,
      },
      username: {
        type: 'string',
        required: false,
      },
      password: {
        type: 'string',
        required: false,
      },
      dbName: {
        type: 'string',
        required: false,
        allowEmpty: true,
      },
    });
    const dbId = +ctx.params.dbId;
    const database = await DataSource.ensureExist(dbId);
    if (!database) {
      ctx.throw(404);
    }
    const updated = await database.update(ctx.request.body);
    ctx.body = updated;
  }

  async test(ctx) {
    const dbInfo = DataSourceCtl.verifyDBInfo(ctx);
    const client = new MySQLClient(dbInfo);
    try {
      await client.connect();
    } catch (err) {
      ctx.throw(400, err.message);
    }
    ctx.status = 204;
  }

  async delete(ctx) {
    const dbId = +ctx.params.dbId;
    const database = await DataSource.ensureExist(dbId);
    if (!database) {
      ctx.throw(404, '数据源不存在');
    }
    const apis = await ApiModel.findAll({
      where: {
        sqlId: database.dataValues.id,
      },
    });
    if (apis.length > 0) {
      ctx.throw(400, '无法删除，该数据源正被某些api使用');
    }
    await database.destroy({ force: true });
    ctx.status = 204;
  }

  async create(ctx) {
    const dbInfo = DataSourceCtl.verifyDBInfo(ctx);
    if (dbInfo.id) {
      delete dbInfo.id;
    }
    const database = await DataSource.create({ ...dbInfo });
    ctx.status = 201;
    ctx.body = database;
  }

  static verifyDBInfo(ctx) {
    ctx.verifyParams({
      type: {
        type: 'enum',
        values: Object.values(dbType),
      },
      name: 'string',
      host: 'string',
      port: {
        type: 'int',
        required: false,
      },
      username: 'string',
      password: 'string',
      dbName: {
        type: 'string',
        allowEmpty: true,
        required: false,
      },
    });
    return ctx.request.body;
  }
}
module.exports = new DataSourceCtl();
