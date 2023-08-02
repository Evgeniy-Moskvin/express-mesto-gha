const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');

router.get('/', (req, res) => {
  res.send('Главная страница');
});

router.use(userRouter);
router.use(cardRouter);

router.all('*', (req, res) => {
  res.status(404).send({ message: 'Ресурс не найден или был удален' });
});

module.exports = router;
