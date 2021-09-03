const slugHelper = require("./slugHelper");

describe("slugify test", () => {
  test("should slugify requirements case", () => {
    expect(slugHelper.doSlugify("this is a slug with very long")).toBe(
      "this-is-a-slug-with-very-long"
    );
  });
  test("should slug a capitalize characters", () => {
    expect(slugHelper.doSlugify("This iS aN eXamPle")).toBe(
      "this-is-an-example"
    );
  });
});
