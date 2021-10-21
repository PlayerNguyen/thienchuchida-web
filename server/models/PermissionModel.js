const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const DatabaseConfig = require("../config/database.config");

const permissionSchema = mongoose.Schema({
  _id: { type: String, required: true, default: uuid },
  name: { type: String, required: true },
  localize: { type: String, required: true },
});

/**
 * Export the models for the usage
 */
module.exports = mongoose.model(
  DatabaseConfig.Model.Permissions.Name,
  permissionSchema
);
