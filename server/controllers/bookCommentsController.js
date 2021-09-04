const BookCommentsModel = require("../models/BookCommentsModel");

async function addBookComment(content) {
  return BookCommentsModel.create({ content });
}

const BookCommentsController = {
  addBookComment
};

module.exports = BookCommentsController;
