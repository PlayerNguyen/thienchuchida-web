const express = require("express");
const { increaseView } = require("../controllers/bookChapterController");

const BookChapterController = require("../controllers/bookChapterController");
const BookController = require("../controllers/bookController");
const { MiddlewareError } = require("../errors/MiddlewareError");
const { getAdminAuthorize } = require("../middlewares/AuthMiddleware");
const router = express.Router();

/**
 * Post a new chapter
 */
router.post(`/`, getAdminAuthorize, async (req, res, next) => {
  try {
    const { name, book } = req.body;
    // Empty book and name
    if (!name || !book) {
      return next(new MiddlewareError("Không có tên và giá trị truyện"));
    }
    // Create a new chapter
    const createdChapter = await BookChapterController.createChapter(
      name,
      book
    );
    // Set updated to the book
    await BookController.setUpdatedTimeToNow(book);
    // Response to user
    res.json({
      message: "Đã tạo thành công tập truyện mới",
      data: createdChapter,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Get specific chapter by id
 */
router.get(`/chapter/:chapterId`, async (req, res, next) => {
  try {
    const { chapterId } = req.params;
    const chapter = await BookChapterController.getChapterById(chapterId);
    res.json({
      data: chapter,
    });
  } catch (err) {
    next(err);
  }
});

router.put(`/chapter/:chapterId`, getAdminAuthorize, async (req, res, next) => {
  try {
    const { chapterId } = req.params;
    const updatedChapter = await BookChapterController.findAndUpdateChapter(
      chapterId,
      req.body
    );
    res.json({
      message: "Cập nhật tập truyện thành công.",
      data: updatedChapter,
    });
  } catch (err) {
    next(err);
  }
});

router.get(`/book/:bookSlug/chapter/:chapterSlug`, async (req, res, next) => {
  try {
    const { bookSlug, chapterSlug } = req.params;
    // Get by a slug and book 
    const responseChapter = await BookChapterController.getChapterBySlug(
      bookSlug,
      chapterSlug
    );
    // Get next chapter for viewer to watch
    const nextChapter = await BookChapterController.getNextChapter(
      responseChapter.book,
      responseChapter._id
    );
    // Increase a view when visit hit the trigger
    await increaseView(responseChapter._id);
    res.json({ data: responseChapter, nextChapter: nextChapter });
  } catch (err) {
    next(err);
  }
});

router.delete(`/chapter/:id`, getAdminAuthorize, async (req, res, next) => {
  try {
    const { id } = req.params;
    await BookChapterController.deleteChapter(id);
    res.json({ message: "Đã xoá thành công tập truyện" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
