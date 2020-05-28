const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.MYSQL_DB_NAME,
  process.env.MYSQL_DB_USER,
  process.env.MYSQL_DB_PASSWORD,
  {
    dialect: process.env.DB_TYPE,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    // logging: console.log,
    logging: false,
    timezone: '+08:00',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: true, // 自动添加 createAt, updateAt
      paranoid: true,
      scopes: {
        timer: {
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'deletedAt'],
          },
        },
      },
    },
  },
);

sequelize.sync({
  force: false, // waring: false
});

module.exports = sequelize;
