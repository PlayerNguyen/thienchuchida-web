const express = require("express");
const router = express.Router();
const { getAdminAuthorize } = require("../middlewares/AuthMiddleware");
const NotifyController = require("../controllers/notifyController");

router.get("/", async (req, res, next) => {
  try {
    const docs = await NotifyController.fetchNotify("-createdAt");
    res.json({ data: docs });
  } catch (e) {
    next(e);
  }
});

router.post("/", getAdminAuthorize, async (req, res, next) => {
  try {
    const { title, context } = req.body;
    const doc = await NotifyController.createNotify(title, context);
    res.json({ message: "Đã tạo thành công thông báo mới.", data: doc });
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const doc = await NotifyController.readNotify(id);
    res.json({ data: doc });
  } catch (e) {
    next(e);
  }
});

router.put("/:id", getAdminAuthorize, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, context } = req.body;
    const doc = await NotifyController.updateNotify(id, title, context);
    res.json({ message: "Đã cập nhật thông báo thành công.", data: doc });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", getAdminAuthorize, async (req, res, next) => {
  try {
    const { id } = req.params;
    const doc = await NotifyController.deleteNotify(id);
    res.json({ message: "Đã xoá thông báo thành công.", data: doc });
  } catch (e) {
    next(e);
  }
});

/**
 * Bye
 */
module.exports = router;
