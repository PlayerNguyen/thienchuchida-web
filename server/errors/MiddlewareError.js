class MiddlewareError extends Error {
  constructor(message, statusCode, response) {
    super(message);
    this.name = "MiddlewareError";
    this.statusCode = statusCode;
    this.response = response;
  }
}

module.exports = { MiddlewareError };
