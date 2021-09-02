class TokenNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "TokenNotFoundError";
    this.status = 401;
  }
}

module.exports = TokenNotFoundError;