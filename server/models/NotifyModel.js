const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const DatabaseConfig = require("../config/database.config");

const notifySchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid,
  },
  title: {
    type: String,
    required: [true, "Không tìm thấy mục tiêu đề"],
  },
  context: {
    type: String,
    required: [true, "Không tìm thấy mục context"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const NotifyModel = mongoose.model(
  DatabaseConfig.Model.Notify.Name,
  notifySchema
);
module.exports = NotifyModel;
