const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const NotFound = require('../errors/NotFound');
const { auth } = require('../middlewares/auth');

router.use('/', userRouter);
router.use('/cards', cardRouter);

router.all('*', auth, (req, res, next) => {
  next(new NotFound('Ресурс не найден или был удален'));
});

module.exports = router;
