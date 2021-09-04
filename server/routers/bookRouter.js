const express = require("express");
const router = express.Router();
const {
  createNewBook,
  getBooks,
  getBookById,
  getChaptersInBook,
  addChapter,
  getBooksByTag,
} = require("../controllers/bookController");
const { getAdminAuthorize } = require("../middlewares/AuthMiddleware");
const { MiddlewareError } = require("../errors/MiddlewareError");
const { findSingleTag } = require("../controllers/bookTagController");

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

/**
 * A chapter router cast
 */
//  router.use("/:bookId", chaptersRouter);

/**
 * Get book information
 */
router.get("/book/:bookId", (req, res, next) => {
  const { bookId } = req.params;
  getBookById(bookId)
    .then((book) => {
      if (!book) {
        next(new MiddlewareError("Book not found", 404));
      }

      getChaptersInBook(book._id)
        .then((chapters) => {
          res.json({
            data: book,
            chapters: {
              total_size: chapters.length,
              data: chapters,
            },
          });
        })
        .catch(next);
    })
    .catch(next);
});

/**
 * Post new chapter into a book
 */
router.post("/book/:bookId/chapters", (req, res, next) => {
  const { bookId } = req.params;
  const { name, content } = req.body;
  getBookById(bookId).then((doc) => {
    // Not found a book
    if (!doc) {
      next(
        new MiddlewareError("Book not found with current id", 404, {
          id: bookId,
        })
      );
    }

    // Add chapter
    addChapter(bookId, name, content)
      .then((chapter) => {
        res.json({
          data: chapter,
        });
      })
      .catch(next);
  });
});

router.get("/tags/tag/:tag", (req, res, next) => {
  const { tag } = req.params;
  findSingleTag(tag).then((tag) => {
    // Tag not found, return nothing here
    if (!tag) {
      return res.json({ data: [] });
    }

    // Find by tag
    const id = tag._id;
    getBooksByTag(id).then((books) => {
      res.json({ data: books });
    });
  });
});

module.exports = router;
