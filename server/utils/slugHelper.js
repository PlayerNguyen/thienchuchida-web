const slugify = require("slugify");

function doSlugify(string) {
  return slugify(string, {
    lower: true,
    locate: "vi"
  });
}
const slugHelper = {
  doSlugify,
};
module.exports = slugHelper;
