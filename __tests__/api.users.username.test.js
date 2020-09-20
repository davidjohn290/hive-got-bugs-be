const app = require("../server");
const request = require("supertest");
const knex = require("../db/connection");

describe("/api/users/:username", () => {
  beforeEach(() => knex.seed.run());
  afterAll(() => knex.destroy());

  describe("GET", () => {
    test("GET 200: responds with a specific user object", () => {
      return request(app)
        .get("/api/users/Neal11")
        .expect(200)
        .then(({ body: { user } }) => {
          expect(user.username).toBe("Neal11");
        });
    });
    test("GET 404: responds with 404 error when passed an invalid username", () => {
      return request(app)
        .get("/api/users/hello")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("User does not exist!");
        });
    });
  });

  describe("PATCH", () => {
    test("PATCH 200: responds with the updated user object ", () => {
      return request(app)
        .patch("/api/users/Neal11")
        .send({
          bug_points: 3,
        })
        .expect(200)
        .then(({ body: { updatedUser } }) => {
          expect(updatedUser.username).toBe("Neal11");
          expect(updatedUser.bug_points).toBe(35);
        });
    });
    test("PATCH 200: responds with the updated user object", () => {
      return request(app)
        .patch("/api/users/Neal11")
        .send({ description: "I'm a brilliant coder." })
        .expect(200)
        .then(({ body: { updatedUser } }) => {
          expect(updatedUser.username).toBe("Neal11");
          expect(updatedUser.description).toBe("I'm a brilliant coder.");
        });
    });
    test("PATCH 400: responds with a 400 error when trying to update a property that doesn't exist", () => {
      return request(app)
        .patch("/api/users/Neal11")
        .send({ points: 2 })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request!");
        });
    });
    // To do: PATCH 400: wrong type in body
  });

  describe("INVALID METHODS", () => {
    test("Error 405: responds with a 405 when a request uses an invalid method", () => {
      const invalidMethods = ["post", "put", "delete"];
      const methodPromises = invalidMethods.map((method) => {
        return request(app)
          [method]("/api/users/Neal11")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Method not allowed!");
          });
      });
      return Promise.all(methodPromises);
    });
  });
});
