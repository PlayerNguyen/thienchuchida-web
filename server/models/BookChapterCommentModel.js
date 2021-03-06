const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const DatabaseConfig = require('../config/database.config')
const chapterCommentSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid,
  },
  user: {
    type: String,
    ref: DatabaseConfig.Model.User.Name,
  },
  chapterId: {
    type: String,
    ref: DatabaseConfig.Model.BookChapter.Name,
  },
  content: {
    type: String,
    required: true,
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

module.exports = mongoose.model(
  DatabaseConfig.Model.BookChapterComment.Name,
  chapterCommentSchema
);
