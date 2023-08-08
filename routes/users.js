const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { auth } = require('../middlewares/auth');

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
  getUser,
} = require('../controllers/users');

router.get('/users', auth, getUsers);

router.get('/users/me', auth, getUser);

router.get('/users/:userId', auth, celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().min(24).max(24)
      .hex(),
  }),
}), getUserById);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/(?:http|https):[/][/]((?:[\w-]+)(?:\.[\w-]+)+)(?:[\w.,@?^=%&amp;:[/]~+#-]*[\w@?^=%&amp;[/]~+#-])?/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

router.patch('/users/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

router.patch('/users/me/avatar', auth, celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/(?:http|https):[/][/]((?:[\w-]+)(?:\.[\w-]+)+)(?:[\w.,@?^=%&amp;:[/]~+#-]*[\w@?^=%&amp;[/]~+#-])?/),
  }),
}), updateUserAvatar);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

module.exports = router;
