const { MiddlewareError } = require("../errors/MiddlewareError");
const User = require("../models/UserModel");
const UserModel = require("../models/UserModel");
const TokenHelper = require("../helpers/tokenHelper");

async function signIn(username, password, userAgent, address) {
  const doc = await User.findOne({ username });

  // Username not found
  if (!doc) {
    throw new MiddlewareError(`Không tim thấy tài khoản ${username}.`);
  }

  // Password is not match
  if (!await doc.comparePassword(password)) {
    throw new MiddlewareError("Mật khẩu không đúng, vui lòng thử lại");
  }
  
  // Create new refresh token
  const refreshToken = await TokenHelper.generateRefreshToken(
    doc,
    userAgent,
    address
  );
  // And Access token too
  const accessToken = await TokenHelper.generateAccessToken(doc);

  // Then append it into database
  const len = doc.tokens.push({ token: refreshToken });
  const user = await doc.save();
  const session = user.tokens[len - 1];

  const response = {
    response: user,
    refreshToken: session._id,
    accessToken,
  };
  return response;
}

/**
 * Refresh token.
 *
 * @param {*} refreshTokenId
 * @returns
 */
async function doRefreshToken(refreshTokenId) {
  // refreshTokenId cannot be null
  if (!refreshTokenId) {
    throw new MiddlewareError("Refresh token id cannot be null");
  }

  const user = await User.findOne({ "tokens._id": refreshTokenId });

  // Token not existed
  if (!user) {
    throw new MiddlewareError(`Token is invalid.`, 401);
  }

  const item = user.tokens.find((ele) => ele._id.toString() === refreshTokenId);
  const { token } = item;

  const data = await TokenHelper.verifyRefreshToken(token);
  const accessToken = await TokenHelper.generateAccessToken(data);

  return {
    _id: user._id,
    username: user.username,
    admin: user.admin,
    accessToken,
    refreshToken: refreshTokenId,
  };
}

/**
 * Sign up new account. Whether user existed, throws credential existed.
 *
 * @param {*} param0
 * @returns A promise contains document of user inside
 */
async function signUp(username, password, email) {
  const existedUser = await User.findOne({ username });

  // Existed
  if (existedUser) {
    throw new MiddlewareError(
      "Tên tài khoản của bạn đã có người sử dụng. Hãy chọn tên tài khoản khác."
    );
  }

  const user = new User({ username, password, email });
  return user.save();
}

/**
 * Check via id whether user is an admin or not
 * @param {*} id user id
 * @returns true whether user is an admin, false otherwise.
 */
async function isAdmin(id) {
  const user = await UserModel.findOne({ _id: id });
  if (!user) {
    throw new Error(`User not found ` + id);
  }
  return user.admin;
}

async function getAllAccount() {
  return UserModel.find({}, "-password -__v -tokens");
}

module.exports = {
  signIn,
  doRefreshToken,
  signUp,
  isAdmin,
  getAllAccount,
};
