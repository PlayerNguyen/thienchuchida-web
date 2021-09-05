const { MiddlewareError } = require("../errors/MiddlewareError");
const BookChapterModel = require("../models/BookChapterModel");
const BookModel = require("../models/BookModel");

async function createNewBook({ title, description }) {
  const data = await BookModel.create({ title, description });
  return data;
}

async function addChapter(book, name, content) {
  return new Promise((resolve, reject) => {
    const chapter = new BookChapterModel({ book, name, content });

    chapter.save().then(resolve).catch(reject);
  });
}

async function addResourceChapter({ id, resource }) {
  const chapter = await BookChapterModel.findOne({ id });
  if (!chapter) {
    return reject(new MiddlewareError("Resource chapter not found.", 404));
  }
  chapter.resources = [...chapter.resources, resource];
  return chapter.save();
}

async function getChaptersInBook(book) {
  return await BookChapterModel.find({ book }, "_id name views");
}

async function getChapterById(book, chapter) {
  return BookChapterModel.findOne({
    book,
    $or: [{ _id: chapter }, { slug: chapter }],
  }).populate("thumbnail", "-__v");
}

/**
 * Get all existed book
 * @returns
 */
async function getBooks(query, sort, limit, skip) {
  return await BookModel.find(query, "-__v")
    .sort(sort)
    .limit(limit)
    .skip(skip)
    .populate("thumbnail", "-__v")
    .populate("tags", "-__v");
}

/**
 *
 * @param {*} id
 * @returns
 * @deprecated using get book by id
 */
async function getBookById(id) {
  return BookModel.findOne({ _id: id }, "-__v").populate("tags", "-__v");
}
/**
 * Find a book by query
 * @param {*} query any input
 * @returns a book whether find or null
 */
async function findBook(query) {
  return BookModel.findOne({ $or: [{ _id: query }, { slug: query }] }, "-__v")
    .populate("tags", "-__v")
    .populate("thumbnail", "-__v");
}

async function getBooksByTag(tagId) {
  return BookModel.find({ tags: tagId }, "-__v").populate("tags", "-__v");
}

module.exports = {
  createNewBook,
  addChapter,
  addResourceChapter,
  getChaptersInBook,
  getChapterById,
  getBooks,
  getBookById,
  getBooksByTag,

  findBook,
};
