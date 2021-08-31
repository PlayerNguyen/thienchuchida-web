const express = require("express");
const { signIn, doRefreshToken } = require("../controllers/userController");
const { MiddlewareError } = require("../errors/MiddlewareError");
const router = express.Router();

/**
 * Code here
 */
router.get("/", (req, res, next) => {
  res.end("user interface");
});

router.post("/signin", (req, res, next) => {
  const { username, password } = req.body;
  // Missing parameters
  if (!username || !password) {
    throw new MiddlewareError("Missing parameters.", 500);
  }
  // Sign in method in controller
  signIn(username, password)
    .then(({ response, refreshToken, accessToken }) => {
      // Set token to cookie
      res.cookie("RefreshToken", refreshToken.id, { httpOnly: true });
      res.cookie("AccessToken", accessToken, { httpOnly: true });

      res.json({
        message: "Successfully sign in.",
        data: {
          username: response.username,
          email: response.email,
        },
      });
    })
    .catch(next);
});

router.post("/refresh-token", (req, res, next) => {
  const { RefreshToken } = req.cookies;
  doRefreshToken(RefreshToken).then(({ accessToken, refreshToken }) => {
    
    res.cookie("RefreshToken", refreshToken, { httpOnly: true });
    res.cookie("AccessToken", accessToken, { httpOnly: true });

    res.json({
      message: "Successfully refresh token",
    });
  });
});

module.exports = router;
