const { STATUS_CODE_CONFLICT } = require('../utils/httpStatusCodes');

class Conflict extends Error {
  constructor(message) {
    super(message || 'Запрос конфликтует с текущим состоянием сервера');
    this.statusCode = STATUS_CODE_CONFLICT;
  }
}

module.exports = Conflict;
