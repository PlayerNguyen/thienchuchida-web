const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const slugHelper = require("../utils/slugHelper");
const DatabaseConfig = require('../config/database.config')

const tagsSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid,
  },
  name: {
    type: String,
    required: [true, "Tên thẻ không được để trống"],
    unique: true,
  },
  slug: {
    type: String,
    default: function () {
      return slugHelper.doSlugify(this.name);
    },
  },
});

module.exports = mongoose.model(DatabaseConfig.Model.Tags.Name, tagsSchema);
