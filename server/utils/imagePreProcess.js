const jimp = require("jimp");
const sharp = require("sharp");
// const MiscConfig = require("../config/misc.config");

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

// function processImage(buffer, crop) {
//   return new Promise((res, rej) => {
//     jimp
//       .read(buffer)
//       .then((image) => {
//         // Down-quality this picture
//         if (crop) {
//           const { x, y, height, width } = crop;
//           console.log(crop);
//           return res(
//             image
//               .quality(
//                 parseInt(
//                   MiscConfig.compress.quality ||
//                     MiscConfigDefault.compress.quality
//                 )
//               )
//               .crop(x, y, width, height)
//               .getBufferAsync(image.getMIME())
//           );
//         }
//         return res(
//             image
//               .quality(
//                 parseInt(
//                   MiscConfig.compress.quality ||
//                     MiscConfigDefault.compress.quality
//                 )
//               )
//               .getBufferAsync(image.getMIME())
//           );
//       })
//       .catch(rej);
//   });
// }

function processImage(input, output) {
  return sharp(input).webp({ quality: 30 }).toFile(output);
}

/**
 * Pre process an image before send to client side
 */
const ImagePreprocess = {
  insertTextIntoImage,
  processImage,
};

module.exports = ImagePreprocess;
