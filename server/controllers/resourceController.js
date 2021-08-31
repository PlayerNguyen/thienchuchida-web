const Resource = require("../models/ResourceModel");

/**
 * Uploads and adds new image into database
 *
 * @param {*} a properties of this plugin
 * @returns a promise with doc which was added
 */
async function createNewFile(file) {
  const resource = new Resource({
    originalName: file.originalname,
    fileName: file.filename,
    size: file.size,
    path: file.path,
    mimetype: file.mimetype,
  });
  return resource.save();
}

async function findFile(name) {
  return Resource.findOne({ _id: name }, "-__v");
}

async function removeFile(id) {
  return Resource.findOneAndDelete({ id });
}

module.exports = { createNewFile, findFile, removeFile };
