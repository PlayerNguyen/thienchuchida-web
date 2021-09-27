const jsonwebtoken = require("jsonwebtoken");
const { isAdmin, doRefreshToken } = require("../controllers/userController");
const { MiddlewareError } = require("../errors/MiddlewareError");
const TokenNotFoundError = require("../errors/TokenNotFoundError");
const CookieHelper = require("../helpers/cookieHelper");

function getAuthorize(req, res, next) {
  try {
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
  } catch (err) {
    next(err);
  }
}

async function getAdminAuthorize(req, res, next) {
  try {
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
      return next(
        new MiddlewareError("Unauthorize access.", 401, { id: data.id })
      );
    }
    // Otherwise, continue the task
    req.currentUser = data;
    next();
  } catch (error) {
    next(error);
  }
}

async function getAuthorizeSilent(req, res, next) {
  try {
    const { AccessToken, RefreshToken } = req.cookies;
    // No access token, try to get refresh token
    if (!AccessToken) {
      // Not exist refresh token too
      if (!RefreshToken) {
        throw new TokenNotFoundError("Invalid or not found a token to auth");
      } else {
        const response = await doRefreshToken(RefreshToken);
        const { _id, username, admin } = response;
        // console.log(response);
        CookieHelper.setTokenCookies(
          res,
          response.refreshToken,
          response.accessToken
        );

        req.currentUser = { _id, username, admin };
        next();
      }
      return;
    }

    // Validate token
    const data = jsonwebtoken.verify(
      AccessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    req.currentUser = data;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { getAuthorize, getAuthorizeSilent, getAdminAuthorize };
