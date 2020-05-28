const { Sequelize, Model } = require('sequelize');
const sequelize = require('../core/mysql');

class Project extends Model {
  static async ensureExist(id) {
    const database = await Project.findByPk(id);
    return database;
  }
}

Project.init(
  {
    name: Sequelize.STRING(128),
    remark: Sequelize.STRING(256),
  },
  {
    sequelize,
    tableName: 'project',
    modelName: 'project',
    underscored: true,
  },
);

module.exports = Project;
