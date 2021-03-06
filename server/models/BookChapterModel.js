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
  content: [
    {
      type: String, 
      ref: DatabaseConfig.Model.Resource.Name
    }
  ],
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  thumbnail: {
    type: String,
    ref: DatabaseConfig.Model.Resource.Name
  }
});

bookChapterSchema.methods.increaseView = function() {
  this.views = this.views + 1;
  return this.save();
}

module.exports = mongoose.model(
  DatabaseConfig.Model.BookChapter.Name,
  bookChapterSchema
);
