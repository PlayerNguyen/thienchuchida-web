const express = require("express");
const router = express.Router();

const {
  getAllChapterInBook,
  getChapterById,
} = require("../../controllers/bookController");
const { getAuthorize } = require("../../middlewares/AuthMiddleware");

router.get("/chapter/all", (req, res, next) => {
  const { bookId } = req.params;
  getAllChapterInBook({ bookId }).then((chapters) => {
    res.json({
      data: chapters,
    });
  });
});

// router.post(
//   "/chapter/new",
//   getAuthorize,
//   upload.array("photos"),
//   async (req, res, next) => {
//     // Handle chapter
//     const { bookId } = req.params;
//     const { name } = req.body;
//     // Create new chapter
//     const chapter = await createNewChapter({ bookId, name, resources });
//     const resourceId = chapter._id;
//     res.json({
//       message: "Successfully create new chapter",
//       data: {
//         id: resourceId,
//       },
//     });
//   }
// );

router.get("/chapter/get/:chapter", (req, res, next) => {
  const { bookId, chapter } = req.params;
  getChapterById({ bookId, chapter })
    .then((doc) => {
      res.json({ data: doc });
    })
    .catch(next);
});

module.exports = router;
