const jwt = require("jsonwebtoken");
const MiscConfig = require("../config/misc.config");

async function generateAccessToken(user) {
  // Not found a user to generate a token
  if (!user) {
    throw new Error("user not found in token");
  }

  const { admin, username, _id, display } = user;
  // Fields check
  // if (user.admin === undefined && !user.username && !user._id && !user.display) {
  // }
  if (admin === undefined || !username || !_id || !display)
    throw new Error("check user fields for admin | username | _id | display");

  // Do sign token
  const signedToken = jwt.sign(
    {
      admin,
      username,
      _id,
      display,
    },
    MiscConfig.tokens.accessToken.secret,
    {
      expiresIn: MiscConfig.tokens.accessToken.expiration,
    }
  );

  // Then return
  return signedToken;
}

async function generateRefreshToken(user, userAgent, address) {
  // Not found a user to generate a token
  if (!user) {
    throw new Error("user not found in token");
  }
  const { admin, username, _id, display } = user;
  // Fields check
  // if (user.admin === undefined && !user.username && !user._id) {
  //   throw new Error("check user fields for admin | username | _id");
  // }
  if (admin === undefined || !username || !_id || !display)
    throw new Error("check user fields for admin | username | _id | display");

  // Do sign token
  const signedToken = jwt.sign(
    {
      admin,
      username,
      _id,
      display,
      userAgent,
      address,
    },
    MiscConfig.tokens.refreshToken.secret,
    // process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: MiscConfig.tokens.refreshToken.expiration,
    }
  );

  // Then return
  return signedToken;
}

async function verifyRefreshToken(token) {
  // Validate token
  if (!token) {
    throw new Error("Token not found");
  }

  return jwt.verify(token, MiscConfig.tokens.refreshToken.secret);
}

async function verifyAccessToken(token) {
  // Validate token
  if (!token) {
    throw new Error("Token not found");
  }

  return jwt.verify(token, MiscConfig.tokens.accessToken.secret);
}

const TokenHelper = {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
};
module.exports = TokenHelper;
