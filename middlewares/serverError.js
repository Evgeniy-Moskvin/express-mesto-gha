const { STATUS_CODE_INTERNAL_SERVER_ERROR } = require('../utils/httpStatusCodes');

const serverError = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(STATUS_CODE_INTERNAL_SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
  }

  next();
};

module.exports = {
  serverError,
};
