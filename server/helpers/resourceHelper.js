const fs = require("fs");

async function getBufferFromFile(path) {
  return fs.readFileSync(path);
}

async function deleteFile(path) {
  return fs.unlinkSync(path);
}

const ResourceHelper = { getBufferFromFile, deleteFile };
module.exports = ResourceHelper;
