const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const DatabaseConfig = require('../config/database.config')
const resourceSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid,
  },
  filename: {
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
  path: {
    type: String, 
    required: true,
  },
  private: {
    type: Boolean,
    default: false
  },
  width: {
    type: Number,
  },
  height: {
    type: Number,
  }
});

module.exports = mongoose.model(
  DatabaseConfig.Model.Resource.Name,
  resourceSchema
);
