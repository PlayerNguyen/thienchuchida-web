const settingModel = require("../models/settingModel");

async function init(k, v) {
  const doc = await settingModel.findOne({ key: k });
  // Initialize whether not found this object
  if (!doc) {
    const doc1 = await settingModel.create({ key: k, value: v });
    console.log(
      `Initialize a new setting with key=${doc1.key} and value=${doc1.value}`
    );
  }
}

async function get(key) {
  return settingModel.findOne({ key: key });
}

async function set(key, value) {
  let doc = await settingModel.findOne({ key: key });
  if (!doc) {
    throw new Error("Không tìm thấy khoá " + key);
  }

  doc.value = value;
  return doc.save();
}



const settingController = { init, get, set };
module.exports = settingController;
