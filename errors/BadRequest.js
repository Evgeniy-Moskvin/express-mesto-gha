const { STATUS_CODE_BAD_REQUEST } = require('../utils/httpStatusCodes');

class BadRequest extends Error {
  constructor(message) {
    super(message || 'Некорректный запрос');
    this.statusCode = STATUS_CODE_BAD_REQUEST;
  }
}

module.exports = BadRequest;
