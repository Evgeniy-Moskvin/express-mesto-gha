const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { celebrate, Joi } = require('celebrate');

const {
  getCards, createCard, deleteCard, addLike, deleteLike,
} = require('../controllers/cards');

router.get('/', auth, getCards);

router.post('/', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/(?:http|https):\/\/((?:[\w-]+)(?:\.[\w-]+)+)(?:[\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/),
  }),
}), createCard);

router.delete('/:cardId', auth, celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().min(24).max(24).pattern(/[a-z][0-9]+/), //64ca4a49727e7d6dcf4c37bc
  })
}), deleteCard);

router.put('/:cardId/likes', auth, celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().min(24).max(24).pattern(/[a-z][0-9]+/), //64ca4a49727e7d6dcf4c37bc
  })
}), addLike);

router.delete('/:cardId/likes', auth, celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().min(24).max(24).pattern(/[a-z][0-9]+/), //64ca4a49727e7d6dcf4c37bc
  })
}), deleteLike);

module.exports = router;
