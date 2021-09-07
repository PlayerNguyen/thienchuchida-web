class TokenNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "TokenNotFoundError";
    this.status = 200;
  }
}

module.exports = TokenNotFoundError;