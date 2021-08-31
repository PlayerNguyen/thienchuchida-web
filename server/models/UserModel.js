const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "The username field cannot be empty."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "The password field cannot be empty."],
  },
  tokens: [{
    token: {
      type: String,
    },
  }],
});

/**
 * Hash the password on first save
 */
userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(process.env.BCRYPT_SALT_ROUNDS);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

/**
 * Compare raw password with hashed password.
 *
 * @param {*} password a password to compare
 * @returns  true whether is match, false otherwise
 */
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model(process.env.MODEL_NAME_USER, userSchema);
