const bcrypt = require("bcrypt");

function hash(data) {
  const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT_ROUNDS));
  return bcrypt.hashSync(data, salt);
}

function comparePassword(data, hashed) {
  return bcrypt.compareSync(data, hashed);
}

const BcryptHelper = { hash, comparePassword };
module.exports = BcryptHelper;
