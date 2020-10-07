const app = require("../server");
const request = require("supertest");
const knex = require("../db/connection");

describe("/api", () => {
  beforeEach(() => knex.seed.run());
  afterAll(() => knex.destroy());

  describe("GET", () => {
    test("GET 200: Responds with JSON representation of API", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body: { apiDescription } }) => {
          expect(apiDescription).toEqual(
            expect.objectContaining({
              "GET /api": expect.any(Object),
            })
          );
        });
    });
  });

  describe("INVALID METHODS", () => {
    test("405: request uses invalid method", () => {
      const invalidMethods = ["put", "post", "patch", "delete"];
      const methodPromises = invalidMethods.map((method) => {
        return request(app)
          [method]("/api")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Method not allowed!");
          });
      });
      return Promise.all(methodPromises);
    });
  });
});
