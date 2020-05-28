const dotenv = require('dotenv');

class ENV {
  static initEnv() {
    dotenv.config();
  }
}

module.exports = ENV;
