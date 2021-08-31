const mongoose = require("mongoose");
const Language = require("../languages/language");
const slugify = require("slugify");

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, Language.BookChapter.NameMustNotBeEmpty],
  },
  book: {
    type: mongoose.Types.ObjectId,
    ref: process.env.MODEL_NAME_BOOK,
  },
  slug: {
    type: String,
    default: function () {
      return slugify(this.name);
    },
  },
  resources: [
    {
      type: mongoose.Types.ObjectId,
      ref: process.env.MODEL_NAME_BOOK_IMAGE,
    }
  ]
});

module.exports = mongoose.model(process.env.MODEL_NAME_BOOK_CHAPTER, bookSchema);
