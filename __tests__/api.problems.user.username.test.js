const app = require("../server");
const request = require("supertest");
const knex = require("../db/connection");

// Refactor this to use a query on the problems endpoint
describe.skip("/api/problems/user/:username", () => {
  beforeEach(() => knex.seed.run());
  afterAll(() => knex.destroy());

  describe("GET", () => {
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
    test("GET 404: responds with 404 error when passed a non exist username", () => {
      return request(app)
        .get("/api/problems/user/bigFrank")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Username does not exist!");
        });
    });
  });

  test("405: request uses invalid method", () => {
    const invalidMethods = ["put", "patch", "post", "delete"];
    const methodPromises = invalidMethods.map((method) => {
      return request(app)
        [method]("/api/problems/Neall11")
        .expect(405)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Method not allowed!");
        });
    });
    return Promise.all(methodPromises);
  });
});
