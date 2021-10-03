const mongoose = require("mongoose");
const Language = require("../languages/language");
const lodash = require("lodash");
const { v4: uuid } = require("uuid");
const slugHelper = require("../utils/slugHelper");
const DatabaseConfig = require("../config/database.config");
const BcryptHelper = require("../helpers/bcryptHelper");

const bookSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid,
  },
  title: {
    type: String,
    required: [true, Language.Book.TitleMustNotBeEmpty],
    unique: true,
  },
  description: {
    type: String,
  },
  password: {
    type: String,
  },
  slug: {
    type: String,
    default: function () {
      // slug-random number from 1 to 9999, not to collapse
      return `${slugHelper.doSlugify(this.title)}-${lodash.random(1, 9999)}`;
    },
  },
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  thumbnail: {
    type: String,
    ref: DatabaseConfig.Model.Resource.Name,
  },
  authors: {
    type: String,
    ref: DatabaseConfig.Model.Author.Name,
  },
  creator: {
    type: String,
    ref: DatabaseConfig.Model.User.Name,
  },
  tags: [{ type: String, ref: DatabaseConfig.Model.Tags.Name }],
});

/**
 * Rename will edit a slug too
 */
bookSchema.pre("save", function (next) {
  const book = this;
  book.slug = slugHelper.doSlugify(book.title);
  next();
});

/**
 * Hash a password whenever found a new update
 */
bookSchema.pre("save", function (next) {
  const book = this;
  if (!book.isModified("password")) {
    return next();
  }
  book.password = BcryptHelper.hash(book.password);
  next();
});

bookSchema.methods.comparePassword = function (text) {
  return BcryptHelper.comparePassword(text, this.password);
};

module.exports = mongoose.model(DatabaseConfig.Model.Book.Name, bookSchema);
