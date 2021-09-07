const MiscConfig = require("../config/misc.default");

async function setTokenCookies(res, refreshToken, accessToken) {
  // Set token to cookie
  res.cookie("RefreshToken", refreshToken, {
    httpOnly: true,
    maxAge: MiscConfig.cookies.refreshToken.maxAge,
  });
  res.cookie("AccessToken", accessToken, {
    httpOnly: true,
    maxAge: MiscConfig.cookies.accessToken.maxAge,
  });
}

const CookieHelper = { setTokenCookies };
module.exports = CookieHelper;
