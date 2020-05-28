const fs = require('fs');
const path = require('path');
const storePath = path.join(__dirname, './store.json');

class Store {
  static getSessionId(id) {
    return `sid:${id}`;
  }

  get(id) {
    const data = fs.readFileSync(storePath, 'utf-8');
    try {
      const result = JSON.parse(data)[Store.getSessionId(id)];
      return result || null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  set(id, sess) {
    const data = fs.readFileSync(storePath, 'utf-8');
    try {
      const result = JSON.parse(data);
      result[Store.getSessionId(id)] = sess;
      fs.writeFileSync(storePath, JSON.stringify(result));
    } catch (error) {
      console.log(error);
    }
  }
  destroy(id) {
    const data = fs.readFileSync(storePath, 'utf-8');
    try {
      const result = JSON.parse(data);
      delete result[Store.getSessionId(id)];
      fs.writeFileSync(storePath, JSON.stringify(result));
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new Store();
