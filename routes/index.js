const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const NotFound = require('../errors/NotFound');

router.get('/', (req, res) => {
  res.send('Главная страница');
});

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.all('*', () => {
  throw new NotFound('Ресурс не найден или был удален');
});

module.exports = router;
