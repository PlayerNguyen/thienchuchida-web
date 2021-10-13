const ConfessionModel = require("../models/ConfessionModel");
const MiddlewareError = require("../errors/MiddlewareError");

async function createConfession(content, author, secret) {
  return ConfessionModel.create({ content, author, secret });
}

async function getConfession(id) {
  return ConfessionModel.findOne({ _id: id });
}

async function updateConfession(id, content, secret) {
  const doc = await ConfessionModel.findOne({ _id: id });
  // Not found confession
  if (!doc) {
    throw new MiddlewareError(`Không tìm thấy confession ${id} để cập nhật`);
  }
  // Otherwise, update all things
  doc.content = content;
  // doc.author = author;
  doc.secret = secret;
  return doc.save();
}

async function deleteConfession(id) {
  const doc = await ConfessionModel.findOne({ _id: id });
  // Not found confession
  if (!doc) {
    throw new MiddlewareError(`Không tìm thấy confession ${id} để cập nhật`);
  }

  return ConfessionModel.remove({ _id: id });
}

function fetchConfession(limit, offset, sort) {
  console.log(limit);
  return ConfessionModel.find()
    .skip(parseInt(offset))
    .limit(parseInt(limit))
    .sort(sort)
    .populate("author", "-password -tokens -__v");
}

async function revealConfession(id) {
  const doc = await ConfessionModel.findOne({ _id: id });
  if (!doc) {
    throw new MiddlewareError(`Không tìm thấy confession ${id}`);
  }
  doc.seen = true;
  return doc.save();
}

function countConfessions() {
  return ConfessionModel.count();
}

const ConfessionController = {
  createConfession,
  getConfession,
  updateConfession,
  deleteConfession,
  fetchConfession,
  revealConfession,
  countConfessions,
};

module.exports = ConfessionController;
