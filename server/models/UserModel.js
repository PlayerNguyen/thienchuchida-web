const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { v4: uuid } = require("uuid");
const DatabaseConfig = require("../config/database.config");
const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid,
  },
  username: {
    type: String,
    required: [true, "Tên đăng nhập không được để trống."],
    unique: true,
  },
  display: {
    type: String,
    required: [true, "Tên hiển thị không được để trống."]
  },
  password: {
    type: String,
    required: [true, "Mật khẩu không được để trống."],
  },
  email: {
    type: String,
    unique: true
  },
  avatar: {
    type: String,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  tokens: [
    {
      _id: {
        type: String,
        default: uuid,
      },
      token: {
        type: String,
      },
    },
  ],
});

/**
 * Hash the password on first save
 */
userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
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

module.exports = mongoose.model(DatabaseConfig.Model.User.Name, userSchema);
