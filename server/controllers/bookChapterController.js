const { MiddlewareError } = require("../errors/MiddlewareError");
const BookChapterModel = require("../models/BookChapterModel");
const BookChapter = require("../models/BookChapterModel");
const BookModel = require("../models/BookModel");

async function getChapterById(id) {
  return BookChapter.find({ _id: id });
}

async function findAndUpdateChapter(chapterId, data) {
  return BookChapter.findOneAndUpdate({ _id: chapterId }, data);
}

async function createChapter(chapterName, bookId) {
  return BookChapter.create({ name: chapterName, book: bookId });
}

async function getChapterBySlug(book, chapter) {
  const bookResponse = await BookModel.findOne({
    $or: [{ _id: book }, { slug: book }],
  });
  // Whether book is empty
  if (!bookResponse) {
    throw new MiddlewareError("Không tìm thấy sách để tìm tập.");
  }
  // Otherwise, find chapter by slug
  const bookCurrentId = bookResponse._id;
  const chapterResponse = await BookChapterModel.findOne({
    book: bookCurrentId,
    $or: [{ _id: chapter }, { slug: chapter }],
  });

  return chapterResponse;
}

async function getAllChaptersByBook(bookId) {
  return BookChapter.find({ book: bookId }, "-content");
}

const BookChapterController = {
  getChapterById,
  findAndUpdateChapter,
  createChapter,
  getChapterBySlug,
  getAllChaptersByBook,
};

module.exports = BookChapterController;
