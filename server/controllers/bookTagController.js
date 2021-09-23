const { MiddlewareError } = require("../errors/MiddlewareError");
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
  const query = new RegExp("^" + data + "$", "i");
  return BookTag.find({
    $or: [{ name: query }, { _id: data }, { slug: query }],
  });
}

async function deleteTag(data) {
  const query = { $or: [{ _id: data }, { slug: data }, { name: data }] };
  return BookTag.findOne(query).then((tag) => {
    if (!tag) {
      throw new MiddlewareError(`Không tìm thấy thẻ để xoá.`);
    }

    return BookTag.deleteOne({ _id: tag._id });
  });
}

async function getAllTags() {
  return BookTag.find({}, "-__v");
}

const BookTagController = {
  createNewTag,
  findSingleTag,
  deleteTag,
  getAllTags,
};
module.exports = BookTagController;
