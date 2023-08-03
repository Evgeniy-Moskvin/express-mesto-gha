const Card = require('../models/card');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const { CODE_SUCCESS_REQUEST, CODE_SUCCESS_CREATE } = require('../utils/codeStatus');

const getCards = ((req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(CODE_SUCCESS_REQUEST).send(cards);
    })
    .catch(next);
});

const createCard = ((req, res, next) => {
  Card.create({ ...req.body, owner: req.user._id })
    .then((card) => {
      res.status(CODE_SUCCESS_CREATE).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Некорректные данные'));
        return;
      }
      next(err);
    });
});

const deleteCard = ((req, res, next) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFound(`Карточка с id ${req.params.cardId} не найдена`);
      }
      res.status(CODE_SUCCESS_REQUEST).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Некорректный id'));
        return;
      }
      next(err);
    });
});

const addLike = ((req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFound(`Карточка с id ${req.params.cardId} не найдена`);
      }
      res.status(CODE_SUCCESS_REQUEST).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Некорректный id'));
        return;
      }
      next(err);
    });
});

const deleteLike = ((req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFound(`Карточка с id ${req.params.cardId} не найдена`);
      }
      res.status(CODE_SUCCESS_REQUEST).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Некорректный id'));
        return;
      }
      next(err);
    });
});

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
};
