const { MiddlewareError } = require("../errors/MiddlewareError");

const BookCommentsModel = require("../models/BookCommentsModel");

/**
 * Create a comment in the book
 *
 * @param {*} book a book id to identify
 * @param {*} user a user to identify
 * @param {*} content a content of this comment
 * @returns a generated document of comment
 */
async function createComment(book, user, content) {
  return BookCommentsModel.create({ book: book, user: user, content: content });
}

/**
 * Delete a existed comment. Whether not exist, throw error.
 *
 * @param {*} id an unique id of a comment to remove
 * @returns remove status
 */

async function deleteComment(id) {
  // Find a comment
  const doc = await BookCommentsModel.findOne({ _id: id });
  // Whether not found this
  if (!doc) {
    throw new MiddlewareError("Không tìm thấy bình luận này để xoá");
  }
  // Remove, say bye to your mom
  return BookCommentsModel.remove({ _id: id });
}

/**
 * Update new content for the comment
 *
 * @param {*} id a comment id
 * @param {*} content a content to update
 * @returns saved document
 */
async function updateComment(id, content) {
  // Find a comment
  const doc = await BookCommentsModel.findOne({ _id: id });
  // Whether not found this
  if (!doc) {
    throw new MiddlewareError("Không tìm thấy bình luận này để cập nhật.");
  }
  // Set new things
  doc.content = content || doc.content;
  return doc.save();
}

/**
 * Read a comment.
 *
 * @param {*} id a comment id to read
 * @returns a document whether found, or null for nothing
 */
async function readComment(id) {
  // Find a comment
  return BookCommentsModel.findOne({ _id: id })
    .populate("book", "-__v")
    .populate("user", "-password -__v -tokens");
}

async function readCommentsFromBook(book) {
  // Find a comment from user
  return BookCommentsModel.find({ book })
    .populate("book", "-__v")
    .populate("user", "-password -__v -tokens")
    .sort("-createdAt");
}

const BookCommentsController = {
  createComment,
  deleteComment,
  updateComment,
  readComment,
  readCommentsFromBook,
};

module.exports = BookCommentsController;
