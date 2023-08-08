const jwt = require('jsonwebtoken');
const UnAuthorized = require('../errors/UnAuthorized');

const auth = (req, res, next) => {
  const token = req.cookie.jwt;
  let payload;

  if (!token) {
    throw new UnAuthorized('Необходима авторизация');
  }

  try {
    payload = jwt.verify(token, 'some-secret-key');

  } catch (err) {
    next(new UnAuthorized('Необходима авторизация'));
    return;
  }

  req.user = payload;

  next();
}
module.exports = {
  auth,
};
