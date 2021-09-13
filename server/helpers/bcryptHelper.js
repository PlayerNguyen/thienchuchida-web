const bcrypt = require("bcrypt");

function hash(data) {
  const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT_ROUNDS));
  return bcrypt.hashSync(data, salt);
}

const BcryptHelper = { hash };
module.exports = BcryptHelper;
