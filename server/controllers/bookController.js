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
  return await BookChapterModel.find({ book }, "-__v");
}

async function getChapterById({ bookId, chapter }) {
  const query = {
    $or: [{ slug: chapter }],
  };
  if (chapter.match(/^[0-9a-fA-F]{24}$/)) {
    query.$or.push({ _id: chapter });
  }
  return await BookChapterModel.find(query).populate("resources", "-__v");
}

/**
 * Get all existed book
 * @returns
 */
async function getBooks(query, sort, limit, skip) {
  return BookModel.find(query, "-__v")
    .sort(sort)
    .limit(limit)
    .skip(skip)
    .populate("thumbnail", "-__v")
    .populate("tags", "-__v");
}

async function getBookById(id) {
  return BookModel.findOne({ _id: id }, "-__v").populate("tags", "-__v");
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
};
