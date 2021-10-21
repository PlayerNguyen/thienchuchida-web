const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const DatabaseConfig = require("../config/database.config");

const RoleSchema = mongoose.Schema({
  _id: { type: String, unique: true, default: uuid },
  name: { type: String, unique: true },
  permissions: [{ type: String, ref: DatabaseConfig.Model.Permissions.Name }],
});

module.exports = mongoose.model(DatabaseConfig.Model.Roles.Name, RoleSchema);
