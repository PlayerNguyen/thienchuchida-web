const jwt = require("jsonwebtoken");
async function generateAccessToken(user) {
  // Not found a user to generate a token
  if (!user) {
    throw new Error("user not found in token");
  }

  // Fields check
  if (!user.admin || !user.username || !user._id) {
    throw new Error("check user fields for admin | username | _id");
  }

  // Do sign token
  const signedToken = jwt.sign(
    {
      admin: user.admin,
      username: user.username,
      _id: user._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
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

  // Fields check
  if (!user.admin || !user.username || !user._id) {
    throw new Error("check user fields for admin | username | _id");
  }

  // Do sign token
  const signedToken = jwt.sign(
    {
      admin: user.admin,
      username: user.username,
      _id: user._id,
      userAgent,
      address,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
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

  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
}

async function verifyAccessToken(token) {
  // Validate token
  if (!token) {
    throw new Error("Token not found");
  }

  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

const TokenHelper = {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
};
module.exports = TokenHelper;
