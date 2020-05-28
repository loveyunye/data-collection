const MysqlClient = require('./mysql');

class DBManage {
  constructor() {
    this.pool = {};
  }

  async createConnect(config) {
    let client;
    switch (config.type) {
      case 'mysql':
        client = new MysqlClient(config);
        break;
      default:
        throw new Error(`nonsupport db type ${config.type}`);
    }
    await client.connect();
    return client;
  }

  async testConnect(config) {
    const client = await this.createConnect(config);
    if (client) {
      client.destroy();
    }
  }

  async readDataFromDB(config, sql) {
    const client = await this.createConnect(config);
    const res = await client.query(sql);
    if (client) {
      client.destroy();
    }
    return res;
  }
}

module.exports = DBManage;
