const Project = require('./project');

const ApiModel = require('./apiModel');
const Compose = require('./compose');
const DataSource = require('./dataSource');

Project.hasMany(ApiModel, {
  foreignKey: 'projectId',
});
Project.hasMany(Compose, {
  foreignKey: 'projectId',
});
Project.hasMany(DataSource, {
  foreignKey: 'projectId',
});
