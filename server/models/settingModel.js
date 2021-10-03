const mongoose = require("mongoose");
const DatabaseConfig = require("../config/database.config");

const schema = new mongoose.Schema({
  key: String,
  value: String,
});

module.exports = mongoose.model(DatabaseConfig.Model.Setting.Name, schema);
