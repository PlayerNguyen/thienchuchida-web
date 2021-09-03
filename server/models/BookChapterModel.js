const mongoose = require("mongoose");
const Language = require("../languages/language");
const { v4: uuid } = require("uuid");
const slugHelper = require("../utils/slugHelper");

const bookChapterSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid,
  },
  name: {
    type: String,
    required: [true, Language.BookChapter.NameMustNotBeEmpty],
  },
  book: {
    type: String,
    ref: process.env.MODEL_NAME_BOOK,
    required: [true, "Mục book không thể thiếu"],
  },
  content: {
    type: String,
  },
  views: {
    type: Number,
    default: 0,
  },
  slug: {
    type: String,
    default: function () {
      return slugHelper.doSlugify(this.name);
    },
  },
});

module.exports = mongoose.model(
  process.env.MODEL_NAME_BOOK_CHAPTERS,
  bookChapterSchema
);
