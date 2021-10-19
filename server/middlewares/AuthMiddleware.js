const jsonwebtoken = require("jsonwebtoken");
const MiscConfig = require("../config/misc.default");
const { isAdmin, doRefreshToken } = require("../controllers/userController");
const { MiddlewareError } = require("../errors/MiddlewareError");
const TokenNotFoundError = require("../errors/TokenNotFoundError");
const CookieHelper = require("../helpers/cookieHelper");
const TokenHelper = require("../helpers/tokenHelper");
const { verifyAccessToken } = require("../helpers/tokenHelper");
const UserModel = require("../models/UserModel");

async function getAuthorize(req, res, next) {
  try {
    const { AccessToken } = req.cookies;
    // No access token, mean unauthorize
    if (!AccessToken) {
      throw new TokenNotFoundError(
        "Bạn chưa đăng nhập để tiếp tục thực hiện việc này."
      );
    }

    // Verify a token and export data for next stage
    const data = await verifyAccessToken(AccessToken);
    // Get a newest data from database
    const user = await UserModel.findOne({_id: data._id}, "-password -__v -tokens");
    req.currentUser = user;
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
      return next(
        new TokenNotFoundError(
          "Bạn chưa đăng nhập để tiếp tục thực hiện việc này."
        )
      );
    }

    // Verify the provided access token
    const data = await TokenHelper.verifyAccessToken(AccessToken);

    // Check whether this player is admin or not
    const admin = await isAdmin(data._id);
    
    // User is not an administrator
    if (!admin) {
      return next(
        new MiddlewareError("Không có quyền truy cập trang này.", 401, {
          id: data._id,
        })
      );
    }
    // Otherwise, continue the task
    // Get a newest data from database
    const user = await UserModel.findOne({_id: data._id}, "-password -__v -tokens");
    req.currentUser = user;
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
        res.json({
          error: {
            message: "Người dùng chưa đăng nhập",
            code: "ERR_UNAUTHORIZE",
          },
        });
      } else {
        // Refresh an old access token
        const response = await doRefreshToken(RefreshToken);
        const { _id, username, admin, display } = response;

        // Set cookie to client side
        CookieHelper.setTokenCookies(
          res,
          response.refreshToken,
          response.accessToken
        );

        req.currentUser = { _id, username, admin, display };
        next();
      }
      return;
    }

    // Validate token
    const data = await verifyAccessToken(AccessToken);
    // Get a newest data from database
    const user = await UserModel.findOne({_id: data._id}, "-password -__v -tokens");
    req.currentUser = user;
    next();
  } catch (err) {
    next(err);
  }
}
const AuthMiddleware = { getAuthorize, getAuthorizeSilent, getAdminAuthorize };
module.exports = AuthMiddleware;
