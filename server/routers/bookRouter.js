const express = require("express");
const router = express.Router();
const {
  createNewBook,
  getBooks,
  getBookById,
  getChaptersInBook,
  addChapter,
  findBook,
  updateBook,
  getBooksByTag,
  getChapterById,
} = require("../controllers/bookController");
const { getAdminAuthorize } = require("../middlewares/AuthMiddleware");
const { MiddlewareError } = require("../errors/MiddlewareError");
const { findSingleTag } = require("../controllers/bookTagController");
const BookController = require("../controllers/bookController");

/**
 * Create a new book
 */
router.post("/", getAdminAuthorize, async (req, res, next) => {
  try {
    const { title, description, password } = req.body;
    const { _id } = req.currentUser;
    const book = await createNewBook({
      title,
      description,
      creator: _id,
      password,
    });
    res.json({ data: book, message: "Tạo truyện thành công." });
  } catch (e) {
    next(e);
  }
});

/**
 * Get all the newest book
 */
router.get("/", async (req, res, next) => {
  try {
    const { sort, page, limit, slug } = req.query;
    const start = page && limit ? (page - 1) * limit : 0;
    // Get all books and filter it by parameters
    const doc = await getBooks({}, sort, limit ? parseInt(limit) : 0, start);
    let result = [...doc];
    if (slug) {
      result = result.filter((e) => e.slug === slug);
    }
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

/**
 * Update a book
 */
router.put("/", getAdminAuthorize, async (req, res, next) => {
  try {
    const { _id, title, description, thumbnail, tags, password, author } =
      req.body;

    console.log(req.body);

    const updatedBook = await updateBook(
      _id,
      title,
      description,
      thumbnail,
      tags,
      password,
      author
    );

    res.json({
      message: "Cập nhật truyện thành công.",
      data: updatedBook,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Get book information with chapters
 */
router.get("/book/:bookId", async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const book = await findBook(bookId);

    if (!book) {
      return next(new MiddlewareError("Không tìm thấy truyện này", 404));
    }

    const chapters = await getChaptersInBook(book._id);
    res.json({
      data: book,
      chapters: {
        total_size: chapters.length,
        data: chapters,
        // total_views: totalViews
      },
    });
  } catch (e) {
    next(e);
  }
});

/**
 * Check whether this book has password or not
 */
router.post(`/book/:bookId/has-password`, async (req, res, next) => {
  try {
    const { book } = req.body;
    res.json({ data: await BookController.hasPassword(book) });
  } catch (err) {
    next(err);
  }
});

router.post("/book/:bookId/validate-password", async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const book = await findBook(bookId);
    await book.comparePassword();
  } catch (error) {
    next(error);
  }
});

/**
 * Post new chapter into a book
 */
router.post(
  "/book/:bookId/chapters",
  getAdminAuthorize,
  async (req, res, next) => {
    try {
      const { bookId } = req.params;
      const { name, content } = req.body;
      const book = await getBookById(bookId);
      // Not found a book
      if (!book) {
        return next(
          new MiddlewareError("Book not found with current id", 404, {
            id: bookId,
          })
        );
      }

      // Add chapter
      const chapter = await addChapter(bookId, name, content);
      res.json({
        message: `Đã tạo tập mới cho truyện ${book.title}`,
        data: chapter,
      });
    } catch (e) {
      next(e);
    }
  }
);

router.get("/book/:bookId/chapters/:chapterId", async (req, res, next) => {
  const { bookId, chapterId } = req.params;
  const chapter = await getChapterById(bookId, chapterId);
  if (!chapter) {
    return next(
      new MiddlewareError("Chapter not found in book or not existed", 404)
    );
  }

  res.json({ data: chapter });
});

router.delete(`/book/:id`, getAdminAuthorize, async (req, res, next) => {
  try {
    const { id } = req.params;
    // Deleted this book
    await BookController.deleteBook(id);
    // Then response
    res.json({ message: "Đã xoá các tập truyện và truyện." });
  } catch (e) {
    next(e);
  }
});

/**
 * Get all books by tag (slug, name, ...)
 */
router.get("/tags/books/:tag", async (req, res) => {
  const { tag: query } = req.params;
  const tag = await findSingleTag(query);
  // Tag not found, return nothing here
  if (!tag) {
    return res.json({ data: [] });
  }

  // Find by tag
  const id = tag._id;
  const books = await getBooksByTag(id);
  res.json({ data: books });
});

router.get("/tags/tag/:tag", async (req, res) => {
  const { tag: query } = req.params;
  const tags = await findSingleTag(query);
  res.json({ data: tags });
});

/**
 * Comment to a book
 *
 */
// router.post("/comments/:bookId", getAuthorize, async (req, res, next) => {
//   const { content } = req.body;
//   if (!content) {
//     return next(new MiddlewareError("Field `content` not found", 500));
//   }
//   const comment = await addBookComment(content);
//   res.json({ data: comment });
// });

module.exports = router;
