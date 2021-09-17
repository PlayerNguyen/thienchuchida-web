const BookChapter = require("../models/BookChapterModel");

async function getChapterById(id) {
  return BookChapter.find({ _id: id });
}

async function findAndUpdateChapter(chapterId, data) {
  return BookChapter.findOneAndUpdate({ _id: chapterId }, data);
}

async function createChapter(chapterName, bookId) {
  return BookChapter.create({ name: chapterName, book: bookId }); 
}

const BookChapterController = {
  getChapterById,
  findAndUpdateChapter,
  createChapter,
};
module.exports = BookChapterController;
