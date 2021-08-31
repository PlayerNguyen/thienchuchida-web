const { MiddlewareError } = require("../errors/MiddlewareError");
const User = require("../models/UserModel");
const jsonwebtoken = require("jsonwebtoken");

function signIn(username, password) {
  return new Promise(async (resolve, reject) => {
    const doc = await User.findOne({ username });

    // Username not found
    if (!doc) {
      reject(new MiddlewareError(`Username ${username} not found.`));
      return;
    }

    // Password is not match
    if (!doc.comparePassword(password)) {
      reject(new MiddlewareError("Password is not match."));
      return;
    }

    // Create new refresh token
    const refreshToken = jsonwebtoken.sign(
      { username: doc.username, id: doc._id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
      }
    );

    const accessToken = jsonwebtoken.sign(
      { username: doc.username, id: doc._id },
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

function doRefreshToken(refreshTokenId) {
  return new Promise(async (resolve, reject) => {
    const doc = await User.findOne({ "tokens._id": refreshTokenId });
    // console.log(doc)
    // Token not existed
    if (!doc) {
      return reject(
        new MiddlewareError(`Token is invalid.`)
      );
    }

    const item = doc.tokens.find(
      (ele) => ele._id.toString() === refreshTokenId
    );
    const { token, _id } = item;

    try {
      const data = jsonwebtoken.verify(token, process.env.REFRESH_TOKEN_SECRET);
      const accessToken = jsonwebtoken.sign(
        { username: data.username, id: data.id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
        }
      );
      resolve({ response: doc, accessToken, refreshToken: _id.toString() });
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  signIn,
  doRefreshToken,
};
