const app = require("../server");
const request = require("supertest");
const knex = require("../db/connection");

describe("/api/tech/:slug", () => {
  beforeEach(() => knex.seed.run());
  afterAll(() => knex.destroy());
  describe("GET", () => {
    test("GET 200: responds with a tech object ", () => {
      return request(app)
        .get("/api/tech/JavaScript")
        .expect(200)
        .then(({ body: { tech } }) => {
          expect(tech).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
            })
          );
        });
    });
    test("GET 404: tech not found", () => {
      return request(app)
        .get("/api/tech/notAPieceOfTech")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Tech not found!");
        });
    });
  });
  describe("INVALID METHODS", () => {
    test("405: when request uses invalid method", () => {
      const invalidMethods = ["put", "post", "patch", "delete"];
      const methodPromises = invalidMethods.map((method) => {
        return request(app)
          [method]("/api/tech/JavaScript")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Method not allowed!");
          });
      });
      return Promise.all(methodPromises);
    });
  });
});
