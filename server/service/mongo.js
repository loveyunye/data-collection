const { MongoClient } = require('mongodb');

class MongoConnect {
  constructor({ host, port = 27017, username, password, database }) {
    if (username) {
      this.connectStr = `mongodb://${username}:${password}@${host}:${port}/${database}`;
    } else {
      this.connectStr = `mongodb://${host}:${port}/${database}`;
    }
  }

  async connect() {
    if (this.connection) {
      return this.connection;
    }
    return new Promise((resolve, reject) => {
      MongoClient.connect(this.connectStr, (err, connect) => {
        if (err) {
          reject(err);
        } else {
          this.connection = connect;
          resolve(connect);
        }
      });
    });
  }

  async query(sql) {
    console.log(sql);
  }
}

module.exports = MongoConnect;
