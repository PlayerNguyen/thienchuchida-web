const express = require("express");
const router = express.Router();
const chaptersRouter = require("./bookChapterRouter");
const { createNewBook, getBooks } = require("../../controllers/bookController");
const { getAdminAuthorize } = require("../../middlewares/AuthMiddleware");

/**
 * A chapter router cast
 */
router.use("/:bookId/chapters", chaptersRouter);

/**
 * Create a new book
 */
router.post("/", getAdminAuthorize, (req, res, next) => {
  const { title, description } = req.body;
  createNewBook({ title, description })
    .then((doc) => {
      res.json({ data: doc, url: {}, message: "Successfully create a book." });
    })
    .catch(next);
});

/**
 * Get all the newest book
 */
router.get("/", (req, res, next) => {
  const { sort, page, limit, slug } = req.query;
  const start = page && limit ? (page - 1) * limit : 0;
  // Get all books and filter it by parameters
  getBooks({}, sort, limit ? parseInt(limit) : 0, start)
    .then((doc) => {
      let result = [...doc];
      if (slug) {
        result = result.filter((e) => e.slug === slug);
      }
      res.json({ data: result });
    })
    .catch(next);
});

module.exports = router;
