class BadRequest extends Error {
  constructor(message) {
    super(message || 'Некорректный запрос');
    this.statusCode = 400;
  }
}

module.exports = BadRequest;
