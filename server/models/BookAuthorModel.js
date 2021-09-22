const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const DatabaseConfig = require("../config/database.config");

const bookAuthorSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid,
  },
  name: {
    type: String,
    required: [true, "Tên tác giả không được để trống"],
  },
});

module.exports = mongoose.model(
  DatabaseConfig.Model.Author.Name,
  bookAuthorSchema
);
