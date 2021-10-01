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
    required: [true, "`user` must not be empty"],
  },
  book: {
    type: String,
    ref: DatabaseConfig.Model.Book.Name,
    require: [true, "`bookId` must not be empty"],
  },
  content: {
    type: String,
    required: [true, "`content` must not be empty"],
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
  DatabaseConfig.Model.BookComment.Name,
  chapterCommentSchema
);
