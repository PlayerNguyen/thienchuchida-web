const fs = require("fs");

async function getBufferFromFile(path) {
  return fs.readFileSync(path);
}

async function existFile(path) {
  return fs.existsSync(path);
}

async function deleteFile(path) {
  return fs.unlinkSync(path);
}

async function overwriteFile(file, buffer) {
  return fs.writeFileSync(file.path, buffer);
}

const ResourceHelper = {
  getBufferFromFile,
  deleteFile,
  overwriteFile,
  existFile,
};
module.exports = ResourceHelper;
