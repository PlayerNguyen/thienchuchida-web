const { MiddlewareError } = require("../errors/MiddlewareError");
const User = require("../models/UserModel");
const jsonwebtoken = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

function signIn(username, password, userAgent, address) {
  return new Promise(async (resolve, reject) => {
    const doc = await User.findOne({ username });

    // Username not found
    if (!doc) {
      return reject(new MiddlewareError(`Username ${username} not found.`));
    }

    // Password is not match
    if (!doc.comparePassword(password)) {
      return reject(new MiddlewareError("Password is not match."));
    }

    // Create new refresh token
    const refreshToken = jsonwebtoken.sign(
      {
        username: doc.username,
        id: doc._id,
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
        id: doc._id,
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
    doc.save().then((doc) => {
      const session = doc.tokens[len - 1];
      // console.log(session)
      resolve({
        response: doc,
        refreshToken: {
          id: session._id.toString(),
          value: session.token,
        },
        accessToken,
      });
    });
  });
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
async function signUp({ username, password, email }) {
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
  const doc = await UserModel.findOne({ _id: id });
  if (!doc) {
    throw new MiddlewareError("Không tìm thấy người dùng.", 404, { id });
  }

  return doc.admin;
}

module.exports = {
  signIn,
  doRefreshToken,
  signUp,
  isAdmin,
};
