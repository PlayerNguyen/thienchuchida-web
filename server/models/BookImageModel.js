const mongoose = require("mongoose");

const bookImageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  process.env.MODEL_NAME_BOOK_IMAGE,
  bookImageSchema
);
