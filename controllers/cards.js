const Card = require('../models/card');

const getCards = ((req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    });
});

const createCard = ((req, res) => {
  Card.create({ ...req.body, owner: req.user._id })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Некорректные данные' });
        return;
      }
      res.status(500).send({ message: `Ошибка ${err.message}` });
    });
});

const deleteCard = ((req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: `Карточка с id ${req.params.cardId} не найдена` });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный id' });
        return;
      }
      res.status(500).send({ message: `Ошибка ${err.message}` });
    });
});

const addLike = ((req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: `Карточка с id ${req.params.cardId} не найдена` });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный id' });
        return;
      }
      res.status(500).send({ message: `Ошибка ${err.message}` });
    });
});

const deleteLike = ((req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: `Карточка с id ${req.params.cardId} не найдена` });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректный id' });
        return;
      }
      res.status(500).send({ message: `Ошибка ${err.message}` });
    });
});

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
};
