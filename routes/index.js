const router = require('express').Router();
const userRouter = require('./users');

router.get('/', (req, res) => {
  res.send('Главная страница');
});

router.use(userRouter);

module.exports = router;