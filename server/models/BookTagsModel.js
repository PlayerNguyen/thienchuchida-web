const { Schema, model } = require("mongoose");
const { v4: uuid } = require("uuid");
import slugHelper from "../utils/slugHelper";

const tagsSchema = new Schema({
  _id: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "Tên thẻ không được để trống"],
  },
  slug: {
    type: String,
    default: slugHelper.doSlugify,
  },
});

module.exports = model(process.env.MODEL_NAME_BOOK_TAGS, tagsSchema);
