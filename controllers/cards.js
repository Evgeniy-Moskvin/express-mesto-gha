const Card = require('../models/card');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');
const { STATUS_CODE_OK, STATUS_CODE_CREATED } = require('../utils/httpStatusCodes');

const getCards = ((req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(STATUS_CODE_OK).send(cards);
    })
    .catch(next);
});

const createCard = ((req, res, next) => {
  Card.create({ ...req.body, owner: res.user._id })
    .then((card) => {
      res.status(STATUS_CODE_CREATED).send(card);
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
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFound(`Карточка с id ${req.params.cardId} не найдена`);
    })
    .then((card) => {
      if (res.user._id !== card.owner.toString()) {
        next(new Forbidden('Нет прав для удаления карточки'));
        return;
      }

      Card.findByIdAndRemove(card._id)
        .then((removeCard) => {
          res.status(STATUS_CODE_OK).send(removeCard);
        })
        .catch(next);
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
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: res.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFound(`Карточка с id ${req.params.cardId} не найдена`);
      }
      res.status(STATUS_CODE_OK).send(card);
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
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: res.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFound(`Карточка с id ${req.params.cardId} не найдена`);
      }
      res.status(STATUS_CODE_OK).send(card);
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
