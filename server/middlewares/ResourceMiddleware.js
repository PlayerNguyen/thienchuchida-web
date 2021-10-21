const { findFileMetadata } = require("../controllers/resourceController");
const { getAuthorize } = require("./AuthMiddleware");

function requestPrivateAccess(req, res, next) {
  const { id } = req.params;

  findFileMetadata(id)
    .then((data) => {
      if (data && data.private) {
        return getAuthorize(req, res, next);
      }
      return next();
    })
    .catch(next);
}

const ResourceMiddleware = {
  requestPrivateAccess,
};

module.exports = ResourceMiddleware;
