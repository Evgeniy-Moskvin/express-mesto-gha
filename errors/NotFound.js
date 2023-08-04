const { STATUS_CODE_NOT_FOUND } = require('../utils/httpStatusCodes');

class NotFound extends Error {
  constructor(message) {
    super(message || 'Запрашиваемый ресурс не найден или был удален');
    this.statusCode = STATUS_CODE_NOT_FOUND;
  }
}

module.exports = NotFound;
