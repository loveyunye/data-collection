const { Sequelize, Model } = require('sequelize');
const sequelize = require('../core/mysql');

class UserModel extends Model {
  static async ensureExist(id) {
    const user = await UserModel.findByPk(id);
    return user;
  }
}

UserModel.init(
  {
    id: {
      // 主键 唯一
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING(64),
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    scope: {
      type: Sequelize.INTEGER,
      defaultValue: 8,
    },
    openId: Sequelize.STRING,
  },
  {
    sequelize,
    tableName: 'user',
    modelName: 'user',
    underscored: true,
  },
);

module.exports = UserModel;
