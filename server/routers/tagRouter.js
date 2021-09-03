const express = require("express");
const router = express.Router();
const { getAdminAuthorize } = require("../middlewares/AuthMiddleware");
const BookTagController = require("../controllers/bookTagController");
const { MiddlewareError } = require("../errors/MiddlewareError");

/**
 * Create a new tag
 */
router.post("/", getAdminAuthorize, (req, res, next) => {
  const { name } = req.body;
  BookTagController.findSingleTag(name).then(tag => {
    if (tag) {
      return res.json({
        data: {
          name: tag.name,
          slug: tag.slug,
          _id: tag._id,
        },
      });
    }

    BookTagController.createNewTag(name).then(tag => {
      res.json({
        data: {
          name: tag.name,
          slug: tag.slug,
          _id: tag._id,
        },
      });
    })
  })
  
});

module.exports = router;
