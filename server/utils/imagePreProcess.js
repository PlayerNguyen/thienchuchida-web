const jimp = require("jimp");

function insertTextIntoImage(buffer, text) {
  return new Promise((res) => {
    jimp.read(buffer).then((image) => {
      jimp.loadFont(jimp.FONT_SANS_64_BLACK).then((font) => {
        image.print(
          font,
          0,
          0,
          {
            text: text,
            // alignmentX: jimp.HORIZONTAL_ALIGN_RIGHT,
            // alignmentY: jimp.VERTICAL_ALIGN_BOTTOM,

          },
          () => {
            res(image.getBufferAsync(jimp.AUTO));
          }
        );
      });
    });
  });
}

/**
 * Pre process an image before send to client side
 */
const ImagePreprocess = {
  insertTextIntoImage,
};

module.exports = ImagePreprocess;
