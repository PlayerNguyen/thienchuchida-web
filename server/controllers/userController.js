const { MiddlewareError } = require("../errors/MiddlewareError");
const User = require("../models/UserModel");
const UserModel = require("../models/UserModel");
const TokenHelper = require("../helpers/tokenHelper");

async function signIn(username, password, userAgent, address) {
  const doc = await User.findOne({ $or: [{ username }, { email: username }] });

  // Username not found
  if (!doc) {
    throw new MiddlewareError(`Không tim thấy tài khoản ${username}.`);
  }

  // Password is not match
  if (!(await doc.comparePassword(password))) {
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
async function signUp(username, display, password, email) {
  const existedUser = await User.findOne({
    $or: [{ username: username }, { email: email }],
  });

  // Whether exist this user, throw an error
  if (existedUser) {
    throw new MiddlewareError(
      "Tên tài khoản hoặc email của bạn đã có người sử dụng. Hãy chọn tên tài khoản khác."
    );
  }

  const user = new User({ username, password, email, display });
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

async function signOut(refreshToken) {
  const user = await UserModel.findOne({ "tokens._id": refreshToken });

  // User not found
  if (!user) {
    throw new MiddlewareError("Người dùng đăng xuất không hợp lệ.");
  }

  user.tokens = user.tokens.filter((token) => token !== refreshToken);
  return user.save();
}

async function deleteUser(id) {
  const account = await UserModel.findOne({ _id: id });
  if (!account) {
    throw new MiddlewareError(`Không tìm thấy người dùng với id ${id}`);
  }

  return UserModel.deleteOne({ _id: id });
}

async function updateUser(id, body) {
  const doc = await UserModel.findOne({ _id: id }, "-password -tokens");

  if (!doc) {
    throw new MiddlewareError(`Không tìm thấy người dùng với id ${id}`);
  }

  const { password, email, avatar, display } = body;
  if (password) doc.password = password;
  doc.email = email || doc.email;
  doc.avatar = avatar || doc.avatar;
  doc.display = display || doc.display;
  // Then save all
  return doc.save();
}

async function toggleAdmin(id) {
  const doc = await UserModel.findOne({ _id: id });
  // not exist
  if (!doc) {
    throw new MiddlewareError(`Không tìm thấy người dùng với id ${id}`);
  }
  // set admin
  doc.admin = !doc.admin;
  // Then save all
  return doc.save();
}

async function getProfile(id) {
  return UserModel.findOne({_id: id}, "-tokens -password -__v")
}

module.exports = {
  signIn,
  doRefreshToken,
  signUp,
  isAdmin,
  getAllAccount,
  signOut,
  deleteUser,
  updateUser,
  toggleAdmin,
  getProfile
};
