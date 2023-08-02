const Card = require('../models/card');

const getCards = ((req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    });
});

const createCard = ((req, res) => {
  Card.create({...req.body, owner: req.user._id})
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Некорректные данные'});
      }
      res.status(500).send({ message: `Ошибка ${err.message}` });
    });
});

const deleteCard = ((req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: `Карточка с id ${req.params.cardId} не найдена`});
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      res.status(500).send({ message: `Ошибка ${err.message}` });
    });
});

module.exports = {
  getCards,
  createCard,
  deleteCard,
}
