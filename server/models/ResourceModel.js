const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const DatabaseConfig = require('../config/database.config')
const resourceSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid,
  },
  originalName: {
    type: String,
    required: true,
  },
  size: {
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
  data: {
    type: Buffer,
    required: true
  }
});

module.exports = mongoose.model(
  DatabaseConfig.Model.Resource.Name,
  resourceSchema
);
