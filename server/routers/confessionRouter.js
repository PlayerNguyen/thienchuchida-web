const express = require("express");
const ConfessionController = require("../controllers/confessionController");
const { MiddlewareError } = require("../errors/MiddlewareError");
const { getAuthorize } = require("../middlewares/AuthMiddleware");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const router = express.Router();

router.post("/", AuthMiddleware.getAuthorize, async (req, res, next) => {
  try {
    const { content, secret } = req.body;
    // if (!content || !secret) {
    // }
    const author = req.currentUser._id;
    const doc = await ConfessionController.createConfession(
      content,
      author,
      secret
    );
    res.json({ message: "Đã tạo thành công confession.", data: doc });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", AuthMiddleware.getAuthorize, async (req, res, next) => {
  try {
    const { id } = req.params;
    // Get the confession id
    const doc = await ConfessionController.getConfession(id);
    // Whether not found a confession
    if (!doc) {
      return next(
        new MiddlewareError(`Không tìm thấy confession với mã ${id}`)
      );
    }

    // Whether user is not an owner of this confession
    if (doc.author !== req.currentUser._id && !req.currentUser.admin) {
      return next(
        new MiddlewareError(
          `Confession không hợp lệ hoặc bạn không có quyền truy cập.`
        )
      );
    }

    req.json({ data: doc });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", AuthMiddleware.getAuthorize, async (req, res, next) => {
  try {
    const { id } = req.params;
    // Get the confession id
    const doc = await ConfessionController.getConfession(id);
    // Whether not found a confession
    if (!doc) {
      return next(
        new MiddlewareError(`Không tìm thấy confession với mã ${id}`)
      );
    }

    // Whether user is not an owner of this confession
    if (doc.author !== req.currentUser._id && !req.currentUser.admin) {
      return next(
        new MiddlewareError(
          `Confession không hợp lệ hoặc bạn không có quyền truy cập.`
        )
      );
    }
    // Delete and response to user
    await ConfessionController.deleteConfession(id);
    res.json({ message: `Đã xoá confession.` });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", getAuthorize, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content, secret } = req.params;
    // Get the confession id
    const doc = await ConfessionController.getConfession(id);
    // Whether not found a confession
    if (!doc) {
      return next(
        new MiddlewareError(`Không tìm thấy confession với mã ${id}`)
      );
    }

    // Whether user is not an owner of this confession
    if (doc.author !== req.currentUser._id && !req.currentUser.admin) {
      return next(
        new MiddlewareError(
          `Confession không hợp lệ hoặc bạn không có quyền truy cập.`
        )
      );
    }
    // Update and response to user
    const updatedDoc = await ConfessionController.updateConfession(
      id,
      content,
      secret
    );
    res.json({ message: `Đã cập nhật confession.`, data: updatedDoc });
  } catch (error) {
    next(error);
  }
});

router.get(
  `/`,
  AuthMiddleware.getAdminAuthorize,
  async (req, res, next) => {
    try {
      // const { limit, offset, sort } = req.params;
      const {limit, offset, sort} = req.query
      console.log(req.query);
      const docs = await ConfessionController.fetchConfession(limit, offset, sort);
      res.json({ data: docs });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/seen/:id', AuthMiddleware.getAdminAuthorize, async(req, res, next) => {
  try {
    const {id} = req.params;
    await ConfessionController.revealConfession(id);
    res.json({message: "Đã đọc nội dung này."})
  } catch (error) {
    next(error)
  }
})

const ConfessionRouter = router;
module.exports = ConfessionRouter;

