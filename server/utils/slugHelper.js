const slugify = require("slugify");

function doSlugify(string) {
  return slugify(string, {
    lower: true,
  });
}
const slugHelper = {
  doSlugify,
};
module.exports = slugHelper;
