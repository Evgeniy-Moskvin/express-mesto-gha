class NotFound extends Error {
  constructor(message) {
    super(message || 'Запрашиваемый ресурс не найден или был удален');
    this.statusCode = 404;
  }
}

module.exports = NotFound;
