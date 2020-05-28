const { Sequelize, Model } = require('sequelize');
const sequelize = require('../core/mysql');
const { dbType } = require('../config/enum');
class DataSource extends Model {
  static async ensureExist(id) {
    const database = await DataSource.findByPk(id);
    return database;
  }

  static async findByApiKey(key) {
    const [dbInfo] = await sequelize.query(
      `SELECT * FROM dataSource where id = (
      select  sql_id from api where api.key = '${key}'
    );`,
      { model: DataSource },
    );
    return dbInfo;
  }
}

DataSource.init(
  {
    type: Sequelize.ENUM(Object.values(dbType)),
    name: Sequelize.STRING(128),
    host: Sequelize.STRING(128),
    port: Sequelize.INTEGER,
    username: Sequelize.STRING(128),
    password: Sequelize.STRING(128),
    dbName: {
      type: Sequelize.STRING(128),
      allowNull: false,
      defaultValue: '',
    },
  },
  {
    sequelize,
    tableName: 'dataSource',
    modelName: 'dataSource',
    underscored: true,
  },
);

module.exports = DataSource;
