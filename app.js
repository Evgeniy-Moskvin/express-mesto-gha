const express = require('express');
const mongoose = require('mongoose');

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

app.listen(PORT, () => {
  console.log(`Приложение запущено на порту ${PORT}`);
});
