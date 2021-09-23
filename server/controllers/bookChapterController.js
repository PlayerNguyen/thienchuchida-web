const { MiddlewareError } = require("../errors/MiddlewareError");
const BookChapterModel = require("../models/BookChapterModel");
const BookChapter = require("../models/BookChapterModel");
const BookModel = require("../models/BookModel");

/**
 * Find all chapter by id
 *
 * @param {*} id  an id to find a chapter
 * @returns an array of chapter to find
 */
async function getChapterById(id) {
  return BookChapter.find({ _id: id });
}

/**
 * Find one and update a specific chapter.
 *
 * @param {*} chapterId chapter id to update
 * @param {*} data a body data to update. See more in chapter model
 * @returns  update status, or document.
 */
async function findAndUpdateChapter(chapterId, data) {
  return BookChapter.findOneAndUpdate({ _id: chapterId }, data);
}

/**
 * Create new chapter.
 *
 * @param {*} chapterName a chapter name to create
 * @param {*} bookId a book id which linked with this chapter
 */
async function createChapter(chapterName, bookId) {
  return BookChapter.create({ name: chapterName, book: bookId });
}

/**
 * Find a chapter by using book slug|id and chapter slug|id.
 *
 * @param {*} book a book slug or book id
 * @param {*} chapter a chapter slug or id
 * @returns a finding response.
 */
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

/**
 * Get all chapter in a book by book id.
 *
 * @param {*} bookId a book id to get all chapters
 * @returns all chapters data excludes content
 */
async function getAllChaptersByBook(bookId) {
  return BookChapter.find({ book: bookId }, "-content");
}

/**
 * Find a next chapter by specific current chapter
 *
 * @param {*} bookId a current book id of a chapter
 * @param {*} chapterId a chapter id
 * @returns a promise contains next object or null whether found nothing
 */
async function getNextChapter(bookId, chapterId) {
  return BookChapter.find({ book: bookId }).then((chapters) => {
    const index = chapters.findIndex((e) => e._id === chapterId);
    const nextValue = chapters[index + 1];
    return nextValue ? nextValue : null;
  });
}

/**
 * Delete a specific chapter by it id.
 *
 * @param {*} chapterId  a chapter id to remove
 * @returns a promise of delete function
 */
async function deleteChapter(chapterId) {
  return BookChapter.deleteOne({ _id: chapterId });
}

const BookChapterController = {
  getChapterById,
  findAndUpdateChapter,
  createChapter,
  getChapterBySlug,
  getAllChaptersByBook,
  getNextChapter,
  deleteChapter,
};

module.exports = BookChapterController;
