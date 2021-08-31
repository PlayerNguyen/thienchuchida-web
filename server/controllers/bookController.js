const { MiddlewareError } = require("../errors/MiddlewareError");
const BookChapterModel = require("../models/BookChapterModel");

const BookModel = require("../models/BookModel");

async function createNewBook({ title, description }) {
  const data = await BookModel.create({ title, description });
  return data;
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
  return await BookChapterModel.find({ book: bookId }).populate(
    "resources",
    "-__v"
  );
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

module.exports = {
  createNewBook,
  createNewChapter,
  addResourceChapter,
  getAllChapterInBook,
  getChapterById,
};
