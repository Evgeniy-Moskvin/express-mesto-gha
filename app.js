const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const { serverError } = require('./middlewares/serverError');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
})
  .then(() => {
    console.log('Успешное подключение к БД');
  })
  .catch(() => {
    console.error('Ошибка подключения к БД!');
  });

app.use(cookieParser());
app.use(express.json());

app.use(routes);
app.use(errors());
app.use(serverError);

app.listen(PORT, () => {
  console.log(`Приложение запущено на порту ${PORT}`);
});
