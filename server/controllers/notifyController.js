const Notify = require("../models/NotifyModel");
const MiddlewareError = require("../errors/MiddlewareError");

/**
 * Creates a new notify
 * @param {*} title a title of the notify
 * @param {*} context a context of the notify
 * @returns current generated object
 */
async function createNotify(title, context) {
  return Notify.create({ title, context });
}

/**
 * Reads a notify
 * @param {string} id an unique id to read
 * @returns a notify
 */
async function readNotify(id) {
  return Notify.findOne({ _id: id });
}
/**
 * Updates an existed notify by new value
 * @param {*} id an id to update
 * @param {*} title a new title to update
 * @param {*} context a new context to update
 * @returns the new object of notify
 */
async function updateNotify(id, title, context) {
  const doc = await Notify.findOne({ _id: id });
  // Not found a notify
  if (!doc) {
    throw new MiddlewareError("Không tìm thấy thông báo này chỉnh sửa.");
  }
  // Modify and save data
  doc.title = title;
  doc.context = context;
  return doc.save();
}

/**
 * Removes a notify
 * @param {*} id an id of notify
 * @returns
 */
async function deleteNotify(id) {
  const doc = await Notify.findOne({ _id: id });
  // Not found a notify
  if (!doc) {
    throw new MiddlewareError("Không tìm thấy thông báo này chỉnh sửa.");
  }
  // Delete notify
  return Notify.remove({ _id: id });
}

async function fetchNotify(sort) {
  return Notify.find().sort(sort);
}

const NewsController = {
  createNotify,
  readNotify,
  updateNotify,
  deleteNotify,
  fetchNotify
};

module.exports = NewsController;
