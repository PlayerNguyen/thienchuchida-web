const mongoose = require("mongoose");
const Language = require("../languages/language");
const lodash = require("lodash");
const { v4: uuid } = require("uuid");
const BookChapterModel = require("./BookChapterModel");
const slugHelper = require("../utils/slugHelper");
const DatabaseConfig = require('../config/database.config')

const bookSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid,
  },
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
  tags: [{ type: String, ref: process.env.MODEL_NAME_BOOK_TAGS }],
});

bookSchema.post("find", function (results) {
  results.map((result) => {
    BookChapterModel.find({ book: result._id }).then((chapters) => {
      
      let sum = 0;
      for (let i in chapters) {
        const chapter = chapters[i];
        sum += chapter.views;
      }
      result.views = sum;
    });
  });
});

module.exports = mongoose.model(DatabaseConfig.Model.Book.Name, bookSchema);
