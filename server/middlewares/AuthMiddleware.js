const { MiddlewareError } = require("../errors/MiddlewareError");
const jsonwebtoken = require('jsonwebtoken');

function getAuthorize(req, res, next) {
  const { AccessToken } = req.cookies;
  // No access token, mean unauthorize
  if (!AccessToken) {
    throw new MiddlewareError("Access token not found.", 401);
  }

  // Validate token
  const data = jsonwebtoken.verify(AccessToken, process.env.ACCESS_TOKEN_SECRET);  
  req.currentUser = data;

  next()
}

module.exports = { getAuthorize };
