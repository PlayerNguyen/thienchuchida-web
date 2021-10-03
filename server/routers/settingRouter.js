const express = require("express");
const settingController = require("../controllers/settingController");
const { MiddlewareError } = require("../errors/MiddlewareError");
const { getAdminAuthorize } = require("../middlewares/AuthMiddleware");
const router = express.Router();

router.get("/:key", async (req, res, next) => {
  try {
    const { key } = req.params;
    console.log(key);
    const doc = await settingController.get(key);
    if (!doc) {
      throw new MiddlewareError(`Không tìm thấy cài đặt này`, 404);
    }
    res.json({ key: doc.key, value: doc.value });
  } catch (err) {
    next(err);
  }
});

router.put("/:key", getAdminAuthorize, async (req, res, next) => {
  try {
    const { key } = req.params;
    const { value } = req.body;
    const doc = await settingController.set(key, value);
    res.json({ message: "Đã cập nhật thành công", data: doc });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
