const express = require("express");
const router = express.Router();

const { getAdminAuthorize } = require("../middlewares/AuthMiddleware");
const ResourceController = require("../controllers/resourceController");
const { MiddlewareError } = require("../errors/MiddlewareError");
const ResourceMiddleware = require("../middlewares/ResourceMiddleware");
const ImagePreProcess = require("../utils/imagePreProcess");
const ResourceHelper = require("../helpers/resourceHelper");

const multer = require("multer");
const MiscConfig = require("../config/misc.config");
const chalk = require("chalk");
const storage = multer.diskStorage({
  destination: MiscConfig.upload.directory,
});
const upload = multer({ storage: storage });

router.post(
  "/",
  getAdminAuthorize,
  upload.array("files"),
  async (req, res, next) => {
    try {
      const { files } = req;
      const { private } = req.body;

      if (!files) {
        return next(new MiddlewareError("No input files field found"));
      }

      if (files.length <= 0) {
        return next(new MiddlewareError("No input files"));
      }

      console.log(files);

      Promise.all(
        files.map((file) => {
          return new Promise((res) => {
            console.log(`Get file ${file.originalname} from ${file.path}...`);
            ResourceHelper.getBufferFromFile(file.path).then((buffer) => {
              // const { buffer } = file;
              // Minify the size of buffer by compress it
              console.log(
                `Handling and processing the image ${file.originalname}...`
              );
              // Create a file
              console.log(
                `Generating file ${file.originalname} in database...`
              );
              ResourceController.createNewFile(file, buffer, private).then(
                (responseFile) => {
                  res(responseFile);
                  // // Then delete the cache file
                  // console.log(`Removing file ${file.originalname}...`);
                  // ResourceHelper.deleteFile(file.path).then(() => {
                  //   responseFile.data = null;
                  // });
                }
              );
            });
          });
        })
      ).then((files) => {
        res.json({
          data: Array.from(files, (file) => {
            return file._id;
          }),
        });
        // Process files after response
        // files.map(async (file) => {
        //   const buffer = await ResourceHelper.getBufferFromFile(file.path);
        //   const compressedBuffer = await ImagePreProcess.processImage(buffer);
        //   console.log(`Overwriting image ${file.originalname}...`);
        //   await ResourceHelper.overwriteFile(file, compressedBuffer);
        // });
      });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  `/single`,
  getAdminAuthorize,
  upload.single("file"),
  async (req, res, next) => {
    try {
      const { file } = req;
      const { crop } = req.body;
      // console.log(file);
      const buffer = await ResourceHelper.getBufferFromFile(file.path);
      console.log("Processing and compressing an uploaded image...");
      const handledBuffer = await ImagePreProcess.processImage(
        buffer,
        JSON.parse(crop)
      );
      const responseFile = await ResourceController.createNewFile(
        file,
        handledBuffer,
        false
      );
      // Response
      res.json({
        data: responseFile,
        message:
          "Đã tải lên tệp thành công, bạn có thể xem lại tại trang quản lý tài nguyên.",
      });
    } catch (err) {
      next(err);
    }
  }
);

router.get("/", async (req, res, next) => {
  try {
    const { sort, limit, page } = req.query;
    let skip = 0;
    if (limit && page) {
      skip = (page - 1) * limit;
    }
    const files = await ResourceController.getAllFiles(sort, limit, skip);

    res.json({
      total_size: await ResourceController.countAllFiles(),
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
    const results = await ResourceController.searchResourceByOriginalName(
      originalName
    );

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
    const doc = await ResourceController.findFileMetadata(id, false);

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
  "/resource/base64/:id",
  ResourceMiddleware.requestPrivateAccess,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const doc = await ResourceController.findFileMetadata(id);

      // Not found this file
      if (!doc) {
        throw new MiddlewareError("File not found", 404);
      }

      // Set a header to mimetype and send file
      const resource = await ResourceHelper.getBufferFromFile(doc.path);
      res.setHeader("Content-Type", doc.mimetype);
      res.send(resource.toString("base64"));
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/resource/raw/:id",
  ResourceMiddleware.requestPrivateAccess,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const doc = await ResourceController.findFileMetadata(id);

      // Not found this file
      if (!doc) {
        throw new MiddlewareError("File not found", 404);
      }

      // Set a header to mimetype and send file
      const resource = await ResourceHelper.getBufferFromFile(doc.path);
      res.setHeader("Content-Type", doc.mimetype);
      res.send(resource);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/resource/:id", getAdminAuthorize, async (req, res, next) => {
  try {
    const { id } = req.params;
    const file = await ResourceController.removeFile(id);
    console.log(file);
    console.log(
      chalk.bgRed(
        `Remove file ${file.originalName} (${file.path} - ${file.size}) out of the storage folder...`
      )
    );
    // Whether exist, remove a raw file. Otherwise, just remove data
    // if (await ResourceHelper.existFile()) {

    // }
    console.log(`Removing file in path ${file.path}`);
    await ResourceHelper.deleteFile(file.path);
    res.json({
      message: "Đã xoá thành công tài nguyên trên.",
      data: file,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
