const express = require("express");
const {
  createComment,
  readComment,
  deleteComment,
  updateComment,
  readCommentsFromBook,
} = require("../controllers/bookCommentsController");
const { MiddlewareError } = require("../errors/MiddlewareError");
const router = express.Router();
const { getAuthorize } = require("../middlewares/AuthMiddleware");

/**
 * Create new comments
 */
router.post("/", getAuthorize, async (req, res, next) => {
  try {
    // Extract book, content from body and user from session
    const { book, content } = req.body;
    const { _id: user } = req.currentUser;

    // Invokes a create method in model and response
    const createdComment = await createComment(book, user, content);
    res.json({ data: createdComment, message: "Đã bình luận nội dung." });
  } catch (err) {
    next(err);
  }
});

/**
 * Get an exist comment
 */
router.get("/comment/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    // Invokes get and response
    const comment = await readComment(id);
    // Not found a comment
    if (!comment) {
      throw new MiddlewareError("Không tìm thấy nội dung bình luận này", 404);
    }
    res.json({ data: comment });
  } catch (err) {
    next(err);
  }
});

/**
 * Delete a comment
 */
router.delete("/comment/:id", getAuthorize, async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check permissions
    const currentUser = req.currentUser;
    const comment = await readComment(id);
    // console.log(
    //   "currentUser id",
    //   currentUser._id,
    //   "comment user id",
    //   comment.user._id
    // );
    if (comment.user._id !== currentUser._id && !currentUser.admin) {
      return next(
        new MiddlewareError("Bạn không có quyền để thực hiện hành động này.")
      );
    }

    // Invokes delete and response
    await deleteComment(id);
    res.json({ message: "Đã xoá thành công nội dung" });
  } catch (err) {
    next(err);
  }
});

/**
 * Update an old comment
 */
router.put("/comment/:id", getAuthorize, async (req, res, next) => {
  try {
    // Update a comment
    const { id } = req.params;
    const { content } = req.body;
    // Invokes update and response it
    const comment = await updateComment(id, content);
    res.json({ message: "Đã cập nhật bình luận thành công", data: comment });
  } catch (err) {
    next(err);
  }
});

/**
 * Get comment by book
 */

router.get(`/book/:bookId`, async (req, res, next) => {
  try {
    // Fetch comments via book id and then response to client
    const { bookId } = req.params;
    const comments = await readCommentsFromBook(bookId);
    res.json({ data: comments });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
