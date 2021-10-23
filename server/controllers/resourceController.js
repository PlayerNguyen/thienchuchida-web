const Resource = require("../models/ResourceModel");
const { MiddlewareError } = require("../errors/MiddlewareError");

/**
 * Uploads and adds new image into database
 * @param {*} file the file name
 * @param {*} size the file size
 * @param {*} mimetype mimetype of file
 * @param {*} path a relative path
 * @param {*} private whether private or not
 * @param {Number} width a width in pixels
 * @param {Number} height a height in pixels
 * @returns generated file
 */
async function createNewFile(
  name,
  size,
  mimetype,
  path,
  private,
  width,
  height
) {
  return Resource.create({
    filename: name,
    size: size,
    mimetype: mimetype,
    path: path,
    private: private,
    width: width,
    height: height,
  });
}

/**
 *
 * Find a file via its id parameter
 *
 * @param {*} id file name
 * @returns a metadata of that file if found, otherwise null
 */
async function findFileMetadata(id) {
  return Resource.findOne({ _id: id }, `-__v -data`);
}

async function findFileData(id) {
  return Resource.findOne({ _id: id }, `-__v`);
}

/**
 * Find and remove a file
 */
async function removeFile(id) {
  const doc = await Resource.findOneAndDelete({ _id: id });

  if (!doc) {
    throw new MiddlewareError("File not found", 404);
  }
  doc.data = null;

  return doc;
}

async function countAllFiles() {
  return Resource.count();
}

async function getAllFiles(sort, limit, skip) {
  return Resource.find({}, "_id -data")
    .sort(sort)
    .limit(limit ? parseInt(limit) : 0)
    .skip(skip ? parseInt(skip) : 0);
}

async function searchResourceByOriginalName(originalName) {
  return Resource.find({ originalName: new RegExp(originalName) }, "_id");
}

module.exports = {
  createNewFile,
  findFileMetadata,
  removeFile,
  getAllFiles,
  findFileData,
  countAllFiles,
  searchResourceByOriginalName,
};
