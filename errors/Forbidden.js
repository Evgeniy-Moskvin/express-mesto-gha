const { STATUS_CODE_FORBIDDEN } = require('../utils/httpStatusCodes');

class Forbidden extends Error {
  constructor(message) {
    super(message || 'Нет доступа');
    this.statusCode = STATUS_CODE_FORBIDDEN;
  }
}

module.exports = Forbidden;
