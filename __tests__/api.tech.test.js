const app = require("../server");
const request = require("supertest");
const knex = require("../db/connection");

describe("/api/tech", () => {
  beforeEach(() => knex.seed.run());
  afterAll(() => knex.destroy());

  describe("GET", () => {
    test("GET 200: responds with all the tech objects", () => {
      return request(app)
        .get("/api/tech")
        .expect(200)
        .then(({ body: { allTech } }) => {
          expect(allTech.length).toBe(15);
        });
    });
  });

  describe("INVALID METHODS", () => {
    test("405: request uses invalid method", () => {
      const invalidMethods = ["put", "post", "patch", "delete"];
      const methodPromises = invalidMethods.map((method) => {
        return request(app)
          [method]("/api/tech")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Method not allowed!");
          });
      });
      return Promise.all(methodPromises);
    });
  });
});
