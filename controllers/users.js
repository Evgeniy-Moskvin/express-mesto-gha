const User = require('../models/user');

const getUsers = ((req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send({ message: `Ошибка ${err.message}` });
    });
});

const getUserById = ((req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: `Пользователь с id ${req.params.userId} не найден` });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send({ message: `Ошибка ${err.message}` });
    });
});

const createUser = ((req, res) => {
  User.create({ ...req.body })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректные данные' });
        return;
      }
      res.status(500).send({ message: `Ошибка ${err.message}` });
    });
});

const updateUser = ((req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: `Пользователь с id ${req.user._id} не найден` });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректные данные' });
        return;
      }
      res.status(500).send({ message: `Ошибка ${err.message}` });
    });
});

const updateUserAvatar = ((req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: `Пользователь с id ${req.user._id} не найден` });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректные данные' });
        return;
      }
      res.status(500).send({ message: `Ошибка ${err.message}` });
    });
});

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
