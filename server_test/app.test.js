const supertest = require("supertest");
const app = require("./app");

describe("GET /", () => {
  test("should response 200 status code and json content-type", (done) => {
    supertest(app).get("/").expect("Content-Type", /json/).expect(404, done);
  });
});
