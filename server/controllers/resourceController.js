const Resource = require("../models/ResourceModel");
const { MiddlewareError } = require("../errors/MiddlewareError");

/**
 * Uploads and adds new image into database
 *
 * @param {*} file a properties of this plugin
 * @param {Buffer}  data a buffer to set up
 * @param {Boolean} private is private or not
 * @returns a promise with doc which was added
 */
async function createNewFile(file, data, private) {
  const resource = new Resource({
    originalName: file.originalname,
    size: data.length,
    mimetype: file.mimetype,
    data: data,
    private: private,
  });
  return resource.save();
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
