const mysql = require('mysql2/promise');
// create the connection
class MysqlClient {
  constructor({ host, port = 3306, username, password, dbName = '' }) {
    this.host = host;
    this.port = port;
    this.username = username;
    this.password = password;
    this.database = dbName;
  }
  async connect() {
    if (this.connection) {
      return this.connection;
    }
    const connection = await mysql.createConnection({
      host: this.host,
      user: this.username,
      database: this.database,
      port: this.port,
      password: this.password,
    });
    this.connection = connection;
    return this.connection;
  }

  async query(sql) {
    const connection = await this.connect();
    const [rows] = await connection.query(sql);
    return rows;
  }

  destroy() {
    if (this.connection) {
      this.connection.destroy();
    }
  }
}
module.exports = MysqlClient;
