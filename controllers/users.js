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
      if(!user) {
        return res.status(404).send({ message: `Пользователь с id ${req.params.userId} не найден` });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send({ message: `Ошибка ${err.message}` });
    });
});

const createUser = ((req, res) => {
  console.log(req.query);
  User.create({...req.body})
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      /*if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Некорректные данные'});
      }*/
      res.status(500).send({ message: `Ошибка ${err.message}` });
    });
});

module.exports = {
  getUsers,
  getUserById,
  createUser
}
