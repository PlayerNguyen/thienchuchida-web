const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const DatabaseConfig = require("../config/database.config");

const ConfessionSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid,
  },
  content: {
    type: String,
    
  },
  author: {
    type: String,
    ref: DatabaseConfig.Model.User.Name
  },
});
