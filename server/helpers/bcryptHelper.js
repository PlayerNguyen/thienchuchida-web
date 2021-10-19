const bcrypt = require("bcrypt");
const MiscConfig = require("../config/misc.config");

function hash(data) {
  // const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT_ROUNDS));
  const salt = bcrypt.genSaltSync(
    parseInt(MiscConfig.authentication.bcrypt.rounds)
  );
  return bcrypt.hashSync(data, salt);
}

function comparePassword(data, hashed) {
  return bcrypt.compareSync(data, hashed);
}

const BcryptHelper = { hash, comparePassword };
module.exports = BcryptHelper;
