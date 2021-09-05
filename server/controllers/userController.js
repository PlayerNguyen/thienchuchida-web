const { MiddlewareError } = require("../errors/MiddlewareError");
const User = require("../models/UserModel");
const jsonwebtoken = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

async function signIn(username, password, userAgent, address) {
  const doc = await User.findOne({ username });

  // Username not found
  if (!doc) {
    throw new MiddlewareError(`Username ${username} not found.`);
  }

  // Password is not match
  if (!doc.comparePassword(password)) {
    throw new MiddlewareError("Password is not match.");
  }

  // Create new refresh token
  const refreshToken = jsonwebtoken.sign(
    {
      username: doc.username,
      _id: doc._id,
      admin: doc.admin,
      email: doc.email,
      userAgent,
      address,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
    }
  );

  const accessToken = jsonwebtoken.sign(
    {
      username: doc.username,
      _id: doc._id,
      admin: doc.admin,
      email: doc.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
    }
  );

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
  const doc = await User.findOne({ "tokens._id": refreshTokenId });

  // Token not existed
  if (!doc) {
    throw new MiddlewareError(`Token is invalid.`, 401);
  }

  const item = doc.tokens.find((ele) => ele._id.toString() === refreshTokenId);
  const { token, _id } = item;

  const data = jsonwebtoken.verify(token, process.env.REFRESH_TOKEN_SECRET);
  const accessToken = jsonwebtoken.sign(
    { username: data.username, id: data.id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
    }
  );
  return { response: doc, accessToken, refreshToken: _id.toString() };
}

/**
 * Sign up new account. Whether user existed, throws credential existed.
 *
 * @param {*} param0
 * @returns A promise contains document of user inside
 */
async function signUp(username, password, email) {
  const doc = await User.findOne({ username });

  // Existed
  if (doc) {
    throw new MiddlewareError("Credential existed.");
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
