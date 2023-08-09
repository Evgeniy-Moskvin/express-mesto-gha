const jwt = require('jsonwebtoken');
const UnAuthorized = require('../errors/UnAuthorized');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;

  if (!token) {
    next(new UnAuthorized('Необходима авторизация!'));
    return;
  }

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new UnAuthorized('Необходима авторизация!'));
    return;
  }

  res.user = payload;

  next();
};
module.exports = {
  auth,
};
