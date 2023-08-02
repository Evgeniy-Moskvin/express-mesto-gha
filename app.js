const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

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

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64ca4a49727e7d6dcf4c37bc' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.use(routes);

app.listen(PORT, () => {
  console.log(`Приложение запущено на порту ${PORT}`);
});
