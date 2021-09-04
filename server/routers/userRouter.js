const express = require("express");
const {
  signIn,
  doRefreshToken,
  signUp,
} = require("../controllers/userController");
const { MiddlewareError } = require("../errors/MiddlewareError");
const { getAuthorize } = require("../middlewares/AuthMiddleware");
const router = express.Router();

router.post("/signup", (req, res, next) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    throw new MiddlewareError("Missing parameters.", 500);
  }

  signUp({ username, password, email })
    .then((doc) => {
      res.json({
        message: "Successfully create account",
        data: {
          id: doc._id,
        },
      });
    })
    .catch(next);
});

router.post("/signin", (req, res, next) => {
  const { username, password } = req.body;
  // Get user agent browser information
  const userAgent = req.headers["user-agent"] || null;
  // Get user address
  const address = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  // Missing parameters
  if (!username || !password) {
    return next(new MiddlewareError("Missing parameters.", 500));
  }
  // Sign in method in controller
  signIn(username, password, userAgent, address)
    .then(({ response, refreshToken, accessToken }) => {
      // Set token to cookie
      res.cookie("RefreshToken", refreshToken.id, { httpOnly: true });
      res.cookie("AccessToken", accessToken, { httpOnly: true });

      res.json({
        message: "Đăng nhập thành công.",
        data: {
          username: response.username,
          email: response.email,
          id: response._id,
          admin: response.admin,
        },
      });
    })
    .catch(next);
});

router.post("/refresh-token", (req, res, next) => {
  const { RefreshToken } = req.cookies;
  doRefreshToken(RefreshToken)
    .then(({ accessToken, refreshToken }) => {
      res.cookie("RefreshToken", refreshToken, { httpOnly: true });
      res.cookie("AccessToken", accessToken, { httpOnly: true });

      res.json({
        message: "Successfully refresh token",
      });
    })
    .catch((err) => {
      // Sign out
      res.clearCookie("AccessToken");
      res.clearCookie("RefreshToken");
      
      // Don't complicate with this one, occur an error
      next(err);
    });
});

router.post("/signout", (req, res, next) => {
  res.clearCookie("AccessToken");
  res.clearCookie("RefreshToken");

  res.json({
    message: "Successfully sign out",
  });
});

router.post("/profile", getAuthorize, (req, res, next) => {
  const { id, username, admin } = req.currentUser;
  res.json({ id, username, admin });
});

module.exports = router;
