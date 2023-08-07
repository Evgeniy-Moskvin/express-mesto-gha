const bcrypt = require('bcryptjs');

const User = require('../models/user');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const UnAuthorized = require('../errors/UnAuthorized');
const { STATUS_CODE_OK, STATUS_CODE_CREATED } = require('../utils/httpStatusCodes');

const getUsers = ((req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(STATUS_CODE_OK).send(users);
    })
    .catch(next);
});

const getUserById = ((req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFound(`Пользователь с id ${req.params.userId} не найден`);
      }
      res.status(STATUS_CODE_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Некорректный id'));
        return;
      }
      next(err);
    });
});

const createUser = ((req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        name: req.body.name,
        about: req.body.about,
        avatar: req.body.avatar,
        email: req.body.email,
        password: hash
      })
        .then((user) => {
          const { password, ...userData } = user._doc;
          res.status(STATUS_CODE_CREATED).send(userData);
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequest('Некорректные данные'));
            return;
          }
          next(err);
        })
    })
    .catch((err) => {
      next(err);
    });
});

const updateUser = ((req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFound(`Пользователь с id ${req.params.userId} не найден`);
      }
      res.status(STATUS_CODE_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Некорректные данные'));
        return;
      }
      next(err);
    });
});

const updateUserAvatar = ((req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFound(`Пользователь с id ${req.params.userId} не найден`);
      }
      res.status(STATUS_CODE_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Некорректные данные'));
        return;
      }
      next(err);
    });
});

const login = ((req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        throw new UnAuthorized('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        throw new UnAuthorized('Неправильные почта или пароль');
      }


    })
    .catch((err) => {
      next(err);
    });
});

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
};
