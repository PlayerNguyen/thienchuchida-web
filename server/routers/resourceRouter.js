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
  getAllFiles,
} = require("../controllers/resourceController");
const { MiddlewareError } = require("../errors/MiddlewareError");

router.post("/", getAuthorize, upload.array("files"), async (req, res, next) => {
  console.log(req.files)
  if (req.files.length <= 0) {
    return next(new MiddlewareError("No input files"))
  }

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
});

router.get("/", getAuthorize, async (req, res) => {
  const files = await getAllFiles();
  res.json({ data: files });
});

router.get("/:name", async (req, res) => {
  const { name } = req.params;
  const doc = await findFile(name);

  // Not found this file
  if (!doc) {
    throw new MiddlewareError("File not found", 404);
  }

  res.json({ data: doc });
});

router.delete("/:id", getAuthorize, async (req, res) => {
  const { id } = req.params;
  const file = await removeFile(id);
  res.json({
    message: "Successfully remove file",
    data: file,
  });
});

module.exports = router;
