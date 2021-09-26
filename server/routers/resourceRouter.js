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
// const path = require("path");
const { deleteFile } = require("../helpers/resourceHelper");
const ResourceMiddleware = require("../middlewares/ResourceMiddleware");

router.post(
  "/",
  getAuthorize,
  upload.array("files"),
  async (req, res, next) => {
    const { files } = req;
    const { private } = req.body;

    if (!files) {
      return next(new MiddlewareError("No input files field found"));
    }

    if (files.length <= 0) {
      return next(new MiddlewareError("No input files"));
    }
 
    Promise.all(
      files.map((file) => {
        return new Promise((res) => {
          // const filePath = path.join(path.dirname(__dirname), file.path);
          ResourceHelper.getBufferFromFile(file.path).then((buffer) => {
            // Create a file
            createNewFile(file, buffer, private).then((responseFile) => {
              // Then delete the cache file
              deleteFile(file.path).then(() => {
                responseFile.data = null;
                res(responseFile);
              });
            });
          });
        });
      })
    ).then((files) => {
      res.json({
        data: Array.from(files, (file) => {
          return file._id;
        }),
      });
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

router.get("/resource/metadata/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const doc = await findFileMetadata(id, false);

    // Not found this file
    if (!doc) {
      throw new MiddlewareError("File not found", 404);
    }

    res.json({ data: doc, url: { raw: `/resources/resource/raw/${id}` } });
  } catch (err) {
    next(err);
  }
});

router.get(
  "/resource/raw/:id",
  ResourceMiddleware.requestPrivateAccess,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const doc = await findFileData(id);
      
      // Not found this file
      if (!doc) {
        throw new MiddlewareError("File not found", 404);
      }

      // Set a header to mimetype and send file
      res.setHeader("Content-Type", doc.mimetype);
      res.send(doc.data.toString('base64'));
    } catch (err) {
      next(err);
    }
  }
);

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
