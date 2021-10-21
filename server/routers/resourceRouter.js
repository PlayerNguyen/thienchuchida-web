const express = require("express");
const router = express.Router();

const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");

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

function getResourceDirectory() {
  const date = new Date();
  const currentDate = `${date.getFullYear()}_${
    date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()
  }_${date.getDay() < 10 ? "0" + date.getDay() : date.getDay()}`;
  const realDirectory = currentDate;
  return path.join(MiscConfig.resource.directory, realDirectory);
}

router.post(
  "/",
  getAdminAuthorize,
  upload.array("files"),
  async (req, res, next) => {
    try {
      const { files } = req;
      const { private } = req.body;
      console.log("private", private);

      if (!files) {
        return next(new MiddlewareError("No input files field found"));
      }

      if (files.length <= 0) {
        return next(new MiddlewareError("No input files"));
      }

      Promise.all(
        [...files].map(async (file) => {
          // Receive a buffer, then process (compress) the image.
          // const fileBuffer = await ResourceHelper.getBufferFromFile(file.path);

          const currentDir = getResourceDirectory();
          // Check whether not exist, make a directory
          if (!fs.existsSync(currentDir)) {
            fs.mkdirSync(currentDir);
          }

          // Compress the image and convert it to webp
          const generatedFileName =
            [...uuid()].map((e) => (e !== "-" ? e : "")).join("") + ".webp";
          const currentFileLocation = path.join(currentDir, generatedFileName);
          const output = await ImagePreProcess.processImage(
            file.path,
            currentFileLocation
          );
          // Remove the cache file (raw file) in upload
          await ResourceHelper.deleteFile(file.path);

          // Then put this file into database
          const databaseItem = await ResourceController.createNewFile(
            file.originalname,
            output.size,
            "image/webp",
            currentFileLocation,
            private
          );

          return {
            input: file,
            output: output,
            currentPath: currentFileLocation,
            databaseItem,
          };
        })
      ).then((files) => {
        console.log("After all", files);
        res.json({
          message: "Đã thành công tải các tệp lên.",
          data: [...files].map((file) => {
            return file.databaseItem._id;
          }),
        });
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
      const { private } = req.body;

      const currentDir = getResourceDirectory();
      // Check whether not exist, make a directory
      if (!fs.existsSync(currentDir)) {
        fs.mkdirSync(currentDir);
      }

      // Compress the image and convert it to webp
      const generatedFileName =
        [...uuid()].map((e) => (e !== "-" ? e : "")).join("") + ".webp";
      const currentFileLocation = path.join(currentDir, generatedFileName);
      const output = await ImagePreProcess.processImage(
        file.path,
        currentFileLocation
      );
      // Remove the cache file (raw file) in upload
      await ResourceHelper.deleteFile(file.path);

      // Then put this file into database
      const databaseItem = await ResourceController.createNewFile(
        file.originalname,
        output.size,
        "image/webp",
        currentFileLocation,
        private
      );

      res.json({
        message: "Đã tải nội dung này thành công",
        data: databaseItem,
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
      // data:image/png;base64
      // res.setHeader("Content-Type", `data:${doc.mimetype};base64`);
      // res.setHeader('Cache-Control', 'public, max-age=31557600'); // one year
      res.writeHead(200, { "Content-Type": doc.mimetype });
      res.end(resource.toString("base64"));
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/resource/raw/:id",
  // getAuth,
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
