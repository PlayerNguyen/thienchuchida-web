const mongoose = require("mongoose");
const Language = require("../languages/language");
const { v4: uuid } = require("uuid");
const slugHelper = require("../utils/slugHelper");
const DatabaseConfig = require('../config/database.config')

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
    ref: DatabaseConfig.Model.Book.Name,
    required: [true, "Mục book không thể thiếu"],
  },
  content: {
    type: String,
    required: [true, "`content` cannot be empty"],
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
  thumbnail: {
    type: String,
    ref: DatabaseConfig.Model.Resource.Name
  }
});

module.exports = mongoose.model(
  DatabaseConfig.Model.BookChapter.Name,
  bookChapterSchema
);
