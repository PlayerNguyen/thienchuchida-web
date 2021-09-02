const Resource = require("../models/ResourceModel");
const fs = require("fs");
const { MiddlewareError } = require("../errors/MiddlewareError");

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

/**
 *
 * Find a file via its id parameter
 *
 * @param {*} id file name
 * @returns a metadata of that file if found, otherwise null
 */
async function findFile(id) {
  return Resource.findOne({ _id: id }, "-__v");
}

/**
 * Find and remove a file (and uploads)
 */
async function removeFile(id) {
  return new Promise((resolve, reject) => {
    Resource.findOneAndDelete({ _id: id }).then((doc) => {
      if (!doc) {
        return reject(new MiddlewareError("Document not found"));
      }
      // Remove in directory
      // console.log(doc.path)
      fs.unlink(`./${doc.path}`, (err) => {
        if (err) {
          return reject(err);
        }
        resolve(doc);
      });
    });
  });
}

module.exports = { createNewFile, findFile, removeFile };
