const jsonwebtoken = require("jsonwebtoken");
const { isAdmin } = require("../controllers/userController");
const { MiddlewareError } = require("../errors/MiddlewareError");
const TokenNotFoundError = require("../errors/TokenNotFoundError");

function getAuthorize(req, res, next) {
  const { AccessToken } = req.cookies;
  // No access token, mean unauthorize
  if (!AccessToken) {
    throw new TokenNotFoundError("Access token not found.");
  }

  // Validate token
  const data = jsonwebtoken.verify(
    AccessToken,
    process.env.ACCESS_TOKEN_SECRET
  );

  req.currentUser = data;
  next();
}

async function getAdminAuthorize(req, res, next) {
  const { AccessToken } = req.cookies;
  // No access token, mean unauthorize
  if (!AccessToken) {
    return next(new TokenNotFoundError("Access token not found."));
  }

  // Validate token
  const data = jsonwebtoken.verify(
    AccessToken,
    process.env.ACCESS_TOKEN_SECRET
  );

  const admin = await isAdmin(data._id);
  // User is not an administrator
  if (!admin) {
    return next(new MiddlewareError("Unauthorize access.", 401, { id: data.id }));
  }
  // Otherwise, continue the task
  req.currentUser = data;
  next();
}

function getAuthorizeSilent(req, res, next) {
  const { AccessToken } = req.cookies;
  // No access token, mean unauthorize
  if (!AccessToken) {
    return res.json({ response: false });
  }

  // Validate token
  const data = jsonwebtoken.verify(
    AccessToken,
    process.env.ACCESS_TOKEN_SECRET
  );

  req.currentUser = data;
  next();
}

module.exports = { getAuthorize, getAuthorizeSilent, getAdminAuthorize };
