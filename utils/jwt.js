const jwt = require('jsonwebtoken');

const createToken = ((user) => jwt.sign(
  { _id: user._id },
  'some-secret-key',
  { expiresIn: '7d' },
));

module.exports = {
  createToken,
};
