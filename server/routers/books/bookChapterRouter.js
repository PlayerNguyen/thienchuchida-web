const express = require("express");
const router = express.Router();

const {
  getChaptersInBook,
  getChapterById,
  addChapter,
} = require("../../controllers/bookController");
const {
  getAuthorize,
  getAdminAuthorize,
} = require("../../middlewares/AuthMiddleware");

router.get("/", (req, res, next) => {
  const { bookId } = req.params;
  getChaptersInBook({ bookId }).then((chapters) => {
    res.json({
      data: chapters,
    });
  });
});

router.get("/:chapter", (req, res, next) => {
  const { bookId, chapter } = req.params;
  getChapterById({ bookId, chapter })
    .then((doc) => {
      res.json({ data: doc });
    })
    .catch(next);
});

router.post("/", getAdminAuthorize, (req, res, next) => {
  const { name, content } = req.body;
  const { bookId } = req.params;
  addChapter({ bookId, name, content })
    .then((doc) => {
      res.json({
        data: {
          id: doc._id,
        },
      });
    })
    .catch(next);
});

module.exports = router;
