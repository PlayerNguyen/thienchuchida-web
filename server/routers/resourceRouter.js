const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: process.env.UPLOADED_DIRECTORY,
});
const upload = multer({ storage: storage });
const {
  getAuthorize,
  getAdminAuthorize,
} = require("../middlewares/AuthMiddleware");
const {
  createNewFile,
  findFileMetadata,
  findFileData,
  removeFile,
  getAllFiles,
  countAllFiles,
  searchResourceByOriginalName,
} = require("../controllers/resourceController");
const { MiddlewareError } = require("../errors/MiddlewareError");
const ResourceHelper = require("../helpers/resourceHelper");
const path = require("path");
const { deleteFile } = require("../helpers/resourceHelper");

router.post(
  "/",
  getAuthorize,
  upload.array("files"),
  async (req, res, next) => {
    const { files } = req;

    if (!files) {
      return next(new MiddlewareError("No input files field found"));
    }

    if (files.length <= 0) {
      return next(new MiddlewareError("No input files"));
    }

    let responseFiles = [];
    for (let i in files) {
      const file = files[i];
      const filePath = path.join(path.dirname(__dirname), file.path);
      const buffer = await ResourceHelper.getBufferFromFile(filePath);
      // Create a file
      const responseFile = await createNewFile(file, buffer);
      // Then delete the cache file
      await deleteFile(filePath);
      responseFile.data = null;
      // Then push the id into a response file
      responseFiles.push(responseFile);
    }

    res.json({
      data: Array.from(responseFiles, (file) => {
        return file._id;
      }),
    });
  }
);

router.get("/", getAdminAuthorize, async (req, res, next) => {
  try {
    const { sort, limit, page } = req.query;
    let skip = 0;
    if (limit && page) {
      skip = (page - 1) * limit;
    }
    const files = await getAllFiles(sort, limit, skip);

    res.json({
      total_size: await countAllFiles(),
      data: Array.from(files, (v) => {
        return v._id;
      }),
    });
  } catch (err) {
    next(err);
  }
});

router.get("/search", getAdminAuthorize, async (req, res, next) => {
  try {
    const { originalName } = req.query;
    const results = await searchResourceByOriginalName(originalName);

    res.json({
      data: Array.from(results, (v) => {
        return v._id;
      }),
    });
  } catch (e) {
    next(e);
  }
});

router.get("/resource/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const doc = await findFileMetadata(id, false);

    // Not found this file
    if (!doc) {
      throw new MiddlewareError("File not found", 404);
    }

    res.json({ data: doc, url: { raw: `/resources/resource/${id}/raw` } });
  } catch (err) {
    next(err);
  }
});

router.get("/resource/:id/raw", async (req, res, next) => {
  const { id } = req.params;
  try {
    const doc = await findFileData(id);

    // Not found this file
    if (!doc) {
      throw new MiddlewareError("File not found", 404);
    }
    // Set a header to mimetype and send file
    res.setHeader("Content-Type", doc.mimetype);
    res.send(doc.data);
  } catch (err) {
    next(err);
  }
});

router.delete("/resource/:id", getAuthorize, async (req, res, next) => {
  try {
    const { id } = req.params;
    const file = await removeFile(id);
    res.json({
      message: "Successfully remove file",
      data: file,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
