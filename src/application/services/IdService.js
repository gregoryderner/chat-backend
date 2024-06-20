const { v4: uuidv4 } = require('uuid');

class IdService {
  static generateId() {
    return uuidv4();
  }
}

module.exports = IdService;
