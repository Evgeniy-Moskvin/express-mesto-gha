const { STATUS_CODE_UNAUTHORIZED } = require('../utils/httpStatusCodes');

class UnAuthorized extends Error {
  constructor(message) {
    super(message || 'Ошибка авторизации');
    this.statusCode = STATUS_CODE_UNAUTHORIZED;
  }
}

module.exports = UnAuthorized;
