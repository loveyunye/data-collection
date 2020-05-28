const MySQLClient = require('./mysql');
const DataSource = require('../models/dataSource');
const rp = require('request-promise');
const ApiModel = require('../models/apiModel');
const { base64decode } = require('nodejs-base64');

class apiManage {
  async getStatic(code) {
    let res;
    const decode = base64decode(code);
    try {
      res = JSON.parse(decode);
    } catch (error) {
      res = decode;
    }
    return res;
  }

  async getSql(res) {
    const dbInfo = await DataSource.findOne({
      where: {
        id: res.sqlId,
      },
    });
    const client = new MySQLClient(dbInfo.dataValues);
    // 测试链接
    try {
      await client.connect();
    } catch (err) {
      throw new Error(err.message);
    }
    // 进行查询
    const decode = base64decode(res.code);
    try {
      const result = await client.query(decode);
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getUrl(url) {
    try {
      const result = await rp(url);
      return result;
    } catch (err) {
      throw new Error('api的请求地址错误');
    }
  }

  async getData(code) {
    let result;
    if (typeof code === 'object') {
      for (const key in code) {
        code[key] = await this.getData(code[key]);
      }
      result = code;
    } else {
      const parseCode = code.replace(/<%=\s*([^%>]+?)\s*%>/g, (a, b) => b);
      try {
        result = await this.handlerKey(parseCode);
      } catch (err) {
        result = err.message;
      }
    }
    return result;
  }

  async handlerKey(key) {
    const res = await ApiModel.findOne({
      where: {
        key,
      },
    });
    if (!res) {
      throw new Error('api的key不存在');
    }
    const { type, code, url } = res.dataValues;
    let result;
    switch (type) {
      case 'static':
        result = await this.getStatic(code);
        break;
      case 'sql':
        result = await this.getSql(res.dataValues);
        break;
      case 'url':
        result = await this.getUrl(url);
        break;
      default:
        throw new Error('不存在的类型');
    }
    return result;
  }
}

module.exports = new apiManage();
