const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: process.env.UPLOADED_DIRECTORY,
});
const upload = multer({ storage: storage });
const { getAuthorize } = require("../middlewares/AuthMiddleware");
const {
  createNewFile,
  findFile,
  removeFile,
} = require("../controllers/resourceController");
const { MiddlewareError } = require("../errors/MiddlewareError");

router.post(
  "/",
  getAuthorize,
  upload.array("files"),
  async (req, res, next) => {
    const list = [];
    for (let i in req.files) {
      const file = req.files[i];
      const doc = await createNewFile(file);
      list.push(doc);
    }

    res.json({
      message: " Successfully upload file.",
      data: list,
    });
  }
);

router.get("/:name", (req, res, next) => {
  const { name } = req.params;
  findFile(name)
    .then((doc) => {
      // Not found this file
      if (!doc) {
        throw new MiddlewareError("File not found", 404);
      }

      res.json({ data: doc });
    })
    .catch(next);
});

router.delete("/:id", getAuthorize, async (req, res, next) => {
  const { id } = req.params;
  removeFile(id).then((doc) => {
    res.json({
      message: "Successfully remove file",
      data: doc,
    });
  });
});

module.exports = router;
