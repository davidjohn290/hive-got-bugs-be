const app = require("../server");
const request = require("supertest");
const knex = require("../db/connection");

describe("/api/problems/:username", () => {
  beforeEach(() => knex.seed.run());
  afterAll(() => knex.destroy());

  test("GET 200: responds with all problem objects specific to the username", () => {
    return request(app)
      .get("/api/problems/user/Neal11")
      .expect(200)
      .then(({ body: { problems } }) => {
        problems.forEach((problem) => {
          expect(problem.username).toBe("Neal11");
        });
      });
  });
  test("ERROR 404: responds with 404 error when passed a non exist username", () => {
    return request(app)
      .get("/api/problems/user/bigFrank")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Username does not exist!");
      });
  });
});
