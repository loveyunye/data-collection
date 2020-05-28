const { Sequelize, Model } = require('sequelize');
const sequelize = require('../core/mysql');

class ApisBridge extends Model {
  static async ensureExist(id) {
    const compose = await ApisBridge.findByPk(id);
    return compose;
  }
  static async delByCompose(composeKey) {
    await ApisBridge.destroy({
      where: {
        composeKey,
      },
      force: true,
    });
  }
}

ApisBridge.init(
  {
    apiKey: Sequelize.STRING(128),
    composeKey: Sequelize.STRING(128),
    positions: Sequelize.STRING(256),
  },
  {
    sequelize,
    tableName: 'apis_bridge',
    modelName: 'apis_bridge',
    underscored: true,
  },
);

module.exports = ApisBridge;
