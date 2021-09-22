const BookAuthorModel = require("../models/BookAuthorModel");

async function createNewAuthor(name) {
  return BookAuthorModel.create({ name });
}

async function getAuthorByName(name) {
  return BookAuthorModel.findOne({ name });
}

async function getAuthorById(id) {
  return BookAuthorModel.findOne({ _id: id });
}

async function deleteAuthor(name) {
  return BookAuthorModel.deleteOne({ name });
}

const AuthorController = {
  createNewAuthor,
  getAuthorById,
  getAuthorByName,
  deleteAuthor, 
};

module.exports = AuthorController;
