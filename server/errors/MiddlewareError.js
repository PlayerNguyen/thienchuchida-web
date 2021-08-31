class MiddlewareError extends Error {
  constructor(message, statusCode, response) {
    super(message);
    this.statusCode = statusCode;
    this.response = response;
  }
}

module.exports = {MiddlewareError};