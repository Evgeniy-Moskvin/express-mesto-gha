const bcrypt = require('bcryptjs');

const User = require('../models/user');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');
const { createToken } = require('../utils/jwt');
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
        password: hash,
      })
        .then((user) => {
          const {
            name, about, avatar, email, _id,
          } = user;
          res.status(STATUS_CODE_CREATED).send({
            name, about, avatar, email, _id,
          });
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new Conflict(`Пользователь с email ${req.body.email} уже зарегистрирован!`));
            return;
          }
          if (err.name === 'ValidationError') {
            next(new BadRequest('Некорректные данные!'));
            return;
          }
          next(err);
        });
    })
    .catch(next);
});

const updateUser = ((req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(res.user._id, { name, about }, { new: true, runValidators: true })
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
  User.findByIdAndUpdate(res.user._id, { avatar }, { new: true, runValidators: true })
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

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = createToken(user);

      return res.cookie('jwt', token, {
        maxAge: 3600 * 24 * 7,
        httpOnly: true,
      }).send({ message: 'success' });
    })
    .catch(next);
});

const getUser = ((req, res, next) => {
  User.findById(res.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFound(`Пользователь с id ${res.user._id} не найден`);
      }
      res.status(STATUS_CODE_OK).send({ user });
    })
    .catch(next);
});

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
  getUser,
};
