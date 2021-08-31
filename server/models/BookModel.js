const mongoose = require("mongoose");
const Language = require("../languages/language");
const slugify = require("slugify");
const lodash = require("lodash");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, Language.Book.TitleMustNotBeEmpty],
  },
  description: {
    type: String,
  },
  slug: {
    type: String,
    default: function () {
      return `${slugify(this.title, { lower: true })}-${lodash.random(
        1,
        9999
      )}`;
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
});

module.exports = mongoose.model(process.env.MODEL_NAME_BOOK, bookSchema);
