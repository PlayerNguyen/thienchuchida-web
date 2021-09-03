const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const resourceSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid,
  },
  originalName: {
    type: String,
    required: true,
  },
  fileName: {
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  mimetype: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  process.env.MODEL_NAME_RESOURCES,
  resourceSchema
);
