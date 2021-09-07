const ResourceHelper = require("./resourceHelper");
const path = require("path");

describe("helper buffer set", () => {
  test("should return a buffer", async () => {
    const fname = path.join(
      path.dirname(__dirname),
      "package.json"
    );
    console.log(fname);
    const buffer = await ResourceHelper.getBufferFromFile({
      path: fname,
    });
    console.log(buffer);
    expect(buffer).not.toEqual(null);
  });
});
