const { Sequelize, Model } = require('sequelize');
const sequelize = require('../core/mysql');

class ApiModel extends Model {
  static async ensureExist(id) {
    const database = await ApiModel.findByPk(id);
    return database;
  }
}

ApiModel.init(
  {
    type: Sequelize.ENUM(['static', 'sql', 'url']),
    name: Sequelize.STRING(128),
    key: Sequelize.STRING(128),
    sqlId: {
      type: Sequelize.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
    description: Sequelize.STRING,
    code: {
      type: Sequelize.TEXT,
      defaultValue: '',
    },
    url: {
      type: Sequelize.STRING(256),
      defaultValue: '',
    },
  },
  {
    sequelize,
    tableName: 'api',
    modelName: 'api',
    underscored: true,
  },
);

module.exports = ApiModel;
