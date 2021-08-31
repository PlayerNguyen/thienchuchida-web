const express = require("express");
const router = express.Router();
const chaptersRouter = require("./bookChapterRouter");
const { createNewBook } = require("../../controllers/bookController");
const { getAuthorize } = require("../../middlewares/AuthMiddleware");

router.post("/new", getAuthorize, (req, res, next) => {
  const { title, description } = req.body;
  createNewBook({ title, description })
    .then((doc) => {
      res.json({ data: doc, url: {}, message: "Successfully create a book." });
    })
    .catch(next);
});

/**
 * A chapter router cast
 */
router.use("/:bookId", chaptersRouter);

module.exports = router;
