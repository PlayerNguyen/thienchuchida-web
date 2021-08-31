const { MiddlewareError } = require("../errors/MiddlewareError");
const BookChapterModel = require("../models/BookChapterModel");
const BookImageModel = require("../models/BookImageModel");
const BookModel = require("../models/BookModel");

async function createNewBook({ title, description }) {
  const data = await BookModel.create({ title, description });
  return data;
}

/**
 * Uploads and adds new image into database
 *
 * @param {*} a properties of this plugin
 * @returns a promise with doc which was added
 */
async function uploadImage({ name, size, path }) {
  return new Promise((resolve, reject) => {
    const BookImage = new BookImageModel({ name, size, path });
    BookImage.save().then(resolve).catch(reject);
  });
}

async function createNewChapter({ bookId, name, resources }) {
  return new Promise((resolve, reject) => {
    const chapter = new BookChapterModel({ book: bookId, name, resources });

    chapter.save().then(resolve).catch(reject);
  });
}

async function addResourceChapter({ id, resource }) {
  return new Promise(async (resolve, reject) => {
    const chapter = await BookChapterModel.findOne({ id });
    if (!chapter) {
      return reject(new MiddlewareError("Resource chapter not found.", 404));
    }
    chapter.resources = [...chapter.resources, resource];
    chapter.save().then(resolve).catch(reject);
  });
}

async function getAllChapterInBook({ bookId }) {
  return await BookChapterModel.find({ book: bookId }).populate("resources", "-__v");
}

module.exports = {
  createNewBook,
  uploadImage,
  createNewChapter,
  addResourceChapter,
  getAllChapterInBook,
};
