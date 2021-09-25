const express = require("express");
const router = express.Router();
const { getAdminAuthorize } = require("../middlewares/AuthMiddleware");
const BookTagController = require("../controllers/bookTagController");
const {
  findSingleTag,
  deleteTag,
  getAllTags,
} = require("../controllers/bookTagController");

/**
 * Create a new tag
 */
router.post("/", getAdminAuthorize, async (req, res, next) => {
  // const { name } = req.body;
  // BookTagController.findSingleTag(name)
  //   .then((tag) => {
  //     if (tag) {
  //       return res.json({
  //         data: {
  //           name: tag.name,
  //           slug: tag.slug,
  //           _id: tag._id,
  //         },
  //       });
  //     }

  //     BookTagController.createNewTag(name)
  //       .then((tag) => {
  //         res.json({
  //           data: {
  //             name: tag.name,
  //             slug: tag.slug,
  //             _id: tag._id,
  //           },
  //         });
  //       })
  //       .catch(next);
  //   })
  //   .catch(next);

  try {
    const { name } = req.body;
    const tagExistence = await BookTagController.findSingleTag(name);

    // Existed tag, response to user
    if (tagExistence.length > 0) {
      return res.json({
        message: `Thẻ ${name} đã tồn tại.`,
        data: tagExistence[0],
      });
    }

    // Otherwise, try to create a new tag and then return
    const generatedTag = await BookTagController.createNewTag(name);
    res.json({ message: `Đã tạo thành công thẻ ${name}.`, data: generatedTag });
  } catch (e) {
    next(e);
  }
});

router.get(`/`, async (req, res, next) => {
  try {
    const tagResponse = await getAllTags();
    res.json({ data: tagResponse });
  } catch (err) {
    next(err);
  }
});

router.get(`/:tag`, async (req, res, next) => {
  try {
    const { tag } = req.params;
    const tagResponse = await findSingleTag(tag);
    res.json({ data: tagResponse });
  } catch (err) {
    next(err);
  }
});

router.delete(`/:id`, getAdminAuthorize, async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteTag(id);
    res.json({ message: "Đã hoàn tất xoá thẻ." });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
