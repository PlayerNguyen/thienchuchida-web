const express = require("express");
const {
  signIn,
  doRefreshToken,
  signUp,
  getAllAccount,
} = require("../controllers/userController");
const { MiddlewareError } = require("../errors/MiddlewareError");
const {
  getAuthorize,
  getAdminAuthorize,
} = require("../middlewares/AuthMiddleware");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    throw new MiddlewareError("Missing parameters.", 500);
  }

  const user = signUp({ username, password, email });
  res.json({
    message: "Successfully create account",
    data: {
      id: user._id,
    },
  });
});

router.post("/signin", async (req, res, next) => {
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
  // signIn(username, password, userAgent, address)
  //   .then(({ response, refreshToken, accessToken }) => {

  //   })
  //   .catch(next);
  const user = await signIn(username, password, userAgent, address);
  // console.log(user)
  const { response, refreshToken, accessToken } = user;
  // Set token to cookie
  res.cookie("RefreshToken", refreshToken, { httpOnly: true });
  res.cookie("AccessToken", accessToken, { httpOnly: true });

  res.json({
    message: "Đăng nhập thành công.",
    data: {
      username: response.username,
      email: response.email,
      _id: response._id,
      admin: response.admin,
    },
  });
});

router.post("/refresh-token", async (req, res, next) => {
  const { RefreshToken } = req.cookies;
  const responseRefreshToken = await doRefreshToken(RefreshToken);
  const { accessToken, refreshToken } = responseRefreshToken;
  try {
    res.cookie("RefreshToken", refreshToken, { httpOnly: true });
    res.cookie("AccessToken", accessToken, { httpOnly: true });

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

router.post("/signout", (req, res) => {
  res.clearCookie("AccessToken");
  res.clearCookie("RefreshToken");

  res.json({
    message: "Successfully sign out",
  });
});

router.post("/profile", getAuthorize, (req, res) => {
  const { id, username, admin } = req.currentUser;
  res.json({ id, username, admin });
});

/**
 * Return all users account without password
 */
router.get("/", getAdminAuthorize, async (req, res) => {
  const accounts = await getAllAccount();
  res.json({ data: accounts });
});

module.exports = router;
