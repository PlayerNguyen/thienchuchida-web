import validateHelper from "./validateHelper";

describe("validate a display name", () => {
  test(`should return true with the name okura.nguyen`, () => {
    expect(validateHelper.validateDisplayName("okura.nguyen")).toEqual(true);
  });

  test(`should return false with the name okura nguyen`, () => {
    expect(validateHelper.validateDisplayName("okura nguyen")).toEqual(false);
  });

  test("should return true with the name Okura_Nguyen_", () => {
    expect(validateHelper.validateDisplayName("Okura_Nguyen_")).toEqual(true);
  });

  test("should return true with the name .Okura_Nguyen_", () => {
    expect(validateHelper.validateDisplayName(".Okura_Nguyen_")).toEqual(false);
  });

  test("should return false with the name /.Okura_Nguyen_", () => {
    expect(validateHelper.validateDisplayName("/.Okura_Nguyen_")).toEqual(
      false
    );
  });
});

describe("validate password", () => {
  test(`should return true with password Nguyen12348`, () => {
    expect(validateHelper.validatePassword(`Nguyen12348`)).toBe(true)
  })
  test(`should return false with password 1234`, () => {
    expect(validateHelper.validatePassword(`1234`)).toBe(false)
  })
  test(`should return false with password alllowercase`, () => {
    expect(validateHelper.validatePassword(`alllowercase`)).toBe(false)
  })

  test(`should return false with password ALLUPPERCASE`, () => {
    expect(validateHelper.validatePassword(`ALLUPPERCASE`)).toBe(false)
  })
  test(`should return true with password Nguyen12348##`, () => {
    expect(validateHelper.validatePassword(`Nguyen12348##`)).toBe(true)
  })
})