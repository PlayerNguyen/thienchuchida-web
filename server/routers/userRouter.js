const express = require("express");
const CookieHelper = require("../helpers/cookieHelper.js");
const {
  signIn,
  doRefreshToken,
  signUp,
  getAllAccount,
  signOut,
} = require("../controllers/userController");
const { MiddlewareError } = require("../errors/MiddlewareError");
const {
  getAdminAuthorize,
  getAuthorizeSilent,
} = require("../middlewares/AuthMiddleware");
const router = express.Router();

router.post("/signup", async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return next(new MiddlewareError("Missing parameters.", 500));
    }

    const generatedUser = await signUp(username, password, email);

    res.json({
      message: "Tạo tài khoản thành công.",
      data: {
        _id: generatedUser._id,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.post("/signin", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // Get user agent browser information
    const userAgent = req.headers["user-agent"] || null;
    // Get user address
    const address = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    // Missing parameters
    if (!username || !password) {
      return next(new MiddlewareError("Missing parameters.", 500));
    }

    const user = await signIn(username, password, userAgent, address);

    const { response, refreshToken, accessToken } = user;

    CookieHelper.setTokenCookies(res, refreshToken, accessToken);

    res.json({
      message: "Đăng nhập thành công.",
      data: {
        username: response.username,
        email: response.email,
        _id: response._id,
        admin: response.admin,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.post("/refresh-token", async (req, res, next) => {
  try {
    const { RefreshToken } = req.cookies;
    const responseRefreshToken = await doRefreshToken(RefreshToken);
    const { accessToken, refreshToken } = responseRefreshToken;
    CookieHelper.setTokenCookies(res, refreshToken, accessToken);

    res.json({
      message: "Successfully refresh token",
    });
  } catch (error) {
    res.clearCookie("AccessToken");
    res.clearCookie("RefreshToken");

    // Don't complicate with this one, occur an error
    next(error);
  }
});

router.post("/signout", async (req, res, next) => {
  try {
    // Delete Refresh token existed in the database
    await signOut(req.cookies.RefreshToken);
    // Then clear cookies
    res.clearCookie("AccessToken");
    res.clearCookie("RefreshToken");
    // Send a header
    res.json({
      message: "Đăng xuất thành công.",
    });
  } catch (e) {
    return next(e);
  }
});

router.post("/profile", getAuthorizeSilent, (req, res, next) => {
  try {
    const { _id, username, admin } = req.currentUser;

    res.json({ _id, username, admin });
  } catch (err) {
    next(err);
  }
});

/**
 * Return all users account except password
 */
router.get("/", getAdminAuthorize, async (req, res, next) => {
  try {
    const accounts = await getAllAccount();
    res.json({ data: accounts });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
