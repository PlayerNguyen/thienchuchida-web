const express = require("express");
const router = express.Router();

const { v4: uuid } = require("uuid");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: `./uploads`,
  filename: function (req, file, cb) {
    cb(null, path.join(Date.now().toString(),`${uuid()}${path.extname(file.originalname)}`));
  },
});
const upload = multer({ storage: storage });

const {
  uploadImage,
  createNewChapter,
  getAllChapterInBook,
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

router.post(
  "/chapter/new",
  getAuthorize,
  upload.array("photos"),
  async (req, res, next) => {
    // Handle chapter
    const { bookId } = req.params;
    const { name } = req.body;
    // Handle file
    const resources = [];
    for (let i in req.files) {
      const file = req.files[i];
      // console.log(file)
      // Upload image
      const doc = await uploadImage({
        name: file.filename,
        path: file.path,
        size: file.size,
      });
      // Push uploaded resources into a list
      resources.push(doc._id);
    }
    // Create new chapter
    const chapter = await createNewChapter({ bookId, name, resources });
    const resourceId = chapter._id;
    res.json({
      message: "Successfully create new chapter",
      data: {
        id: resourceId,
      },
    });
  }
);

// router.post();

module.exports = router;
