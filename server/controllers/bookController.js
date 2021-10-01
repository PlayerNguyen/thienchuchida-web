const { MiddlewareError } = require("../errors/MiddlewareError");
const BookChapterModel = require("../models/BookChapterModel");
const BookModel = require("../models/BookModel");

async function createNewBook({ title, description }) {
  const existedBook = await BookModel.findOne({ title });
  if (existedBook) {
    throw new MiddlewareError(`Truyện với tiêu đề ${title} đã tồn tại.`);
  }
  const data = await BookModel.create({ title, description });
  return data;
}

async function addChapter(book, name, content) {
  const chapter = new BookChapterModel({ book, name, content });
  return chapter.save();
}

async function addResourceChapter({ id, resource }) {
  const chapter = await BookChapterModel.findOne({ id });
  if (!chapter) {
    throw new new MiddlewareError("Resource chapter not found.", 404)();
  }
  chapter.resources = [...chapter.resources, resource];
  return chapter.save();
}

async function getChaptersInBook(book) {
  return BookChapterModel.find({ book }, "-content -book");
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
  return BookModel.find(query, "-__v")
    .sort(sort)
    .limit(limit)
    .skip(skip)
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
 * Find a book by query.
 * 
 * @param {*} query any input
 * @returns a book whether find or null
 */
async function findBook(query) {
  return BookModel.findOne(
    { $or: [{ _id: query }, { slug: query }] },
    "-__v -password"
  ).populate("tags", "-__v").then((doc) => {
    if (doc) {
      doc.views += 1;
      return doc.save();
    }
  });
  // .populate("thumbnail", "-__v");
}

async function getBooksByTag(tagId) {
  return BookModel.find({ tags: tagId }, "-__v").populate("tags", "-__v");
}

/**
 * Update a book by id
 * @param {*} bookId bookId to search to update
 * @param {*} title a title of book
 * @param {*} description a description
 * @param {*} thumbnail a thumbnail
 * @param {*} tags a tags
 * @returns save status of book, document of model
 */
async function updateBook(
  bookId,
  title,
  description,
  thumbnail,
  tags,
  password
) {
  const book = await BookModel.findOne({ _id: bookId });
  // Book not exist
  if (!book) {
    throw new MiddlewareError(`Không tìm thấy truyện ${bookId}`);
  }
  // Set data
  book.title = title || book.title;
  book.description = description || book.description;
  book.thumbnail = thumbnail || book.thumbnail;
  book.tags = tags || book.tags;
  if (password !== undefined) book.password = password;
  book.updatedAt = Date.now();
  // Update and save
  return book.save();
}

async function setUpdatedTimeToNow(bookId) {
  const book = await BookModel.findOne({ _id: bookId });
  book.updatedAt = Date.now();

  return book.save();
}

async function hasPassword(bookId) {
  console.log(bookId);
  const book = await BookModel.findOne({ _id: bookId });

  return book.password !== null || book.password !== undefined;
}

async function deleteBook(bookId) {
  return new Promise((res, rej) => {
    BookModel.findOne({ _id: bookId }).then((doc) => {
      if (!doc) {
        return rej(new MiddlewareError("Không tìm thấy truyện này.", 404));
      }

      BookModel.deleteOne({ _id: bookId }).then(() => {
        BookChapterModel.deleteMany({ book: bookId }).then(() => {
          res();
        });
      });
    });
  });
}

const BookController = {
  createNewBook,
  addChapter,
  addResourceChapter,
  getChaptersInBook,
  getChapterById,
  getBooks,
  getBookById,
  getBooksByTag,
  findBook,
  updateBook,
  setUpdatedTimeToNow,
  hasPassword,
  deleteBook,
};

module.exports = BookController;
