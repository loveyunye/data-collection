const { Sequelize, Model } = require('sequelize');
const sequelize = require('../core/mysql');

class Compose extends Model {
  static async ensureExist(id) {
    const compose = await Compose.findByPk(id);
    return compose;
  }
}

Compose.init(
  {
    name: Sequelize.STRING(128),
    key: Sequelize.STRING(128),
    description: Sequelize.STRING,
    code: {
      type: Sequelize.TEXT,
      defaultValue: '',
    },
  },
  {
    sequelize,
    tableName: 'compose',
    modelName: 'compose',
    underscored: true,
  },
);

module.exports = Compose;
