const BookTag = require("../models/BookTagsModel");

/**
 * Create new tag by name
 *
 * @param {*} name a name of that tag
 * @returns new tag object
 */
async function createNewTag(name) {
  return BookTag.create({ name });
}

async function findSingleTag(data) {
  return BookTag.findOne({
    $or: [{ name: data }, { _id: data }, { slug: data }],
  });
}

const BookTagController = {
  createNewTag,
  findSingleTag,
};
module.exports = BookTagController;
