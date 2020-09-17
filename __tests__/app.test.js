const app = require("../server");
const request = require("supertest");
const knex = require("../db/connection");

describe("/", () => {
  beforeEach(() => knex.seed.run());
  afterAll(() => knex.destroy());
  test("ALL 404: Route does not exist", () => {
    const methodsToCheck = ["get", "put", "post", "patch", "delete"];
    const methodPromises = methodsToCheck.map((method) => {
      return request(app)
        [method]("/notARoute")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Route not found!");
        });
    });
    return Promise.all(methodPromises);
  });
});
