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
          inc_bug_points: 3,
        })
        .expect(200)
        .then(({ body: { user } }) => {
          expect(user.username).toBe("Neal11");
          expect(user.bug_points).toBe(35);
        });
    });
    test("PATCH 200: responds with the updated user object", () => {
      return request(app)
        .patch("/api/users/Neal11")
        .send({
          description: "I'm a brilliant coder.",
          skill1: "JavaScript",
          inc_bug_points: -3,
          bug_points_over_month: 10,
        })
        .expect(200)
        .then(({ body: { user } }) => {
          expect(user.username).toBe("Neal11");
          expect(user.description).toBe("I'm a brilliant coder.");
          expect(user.skill1).toBe("JavaScript");
          expect(user.bug_points).toBe(29);
          expect(user.bug_points_over_month).toBe(10);
        });
    });
    test("PATCH 404: username not found", () => {
      return request(app)
        .patch("/api/users/NotAUser")
        .send({
          bug_points: 3,
        })
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("User not found!");
        });
    });
    test("PATCH 400: wrong data type in body", () => {
      return request(app)
        .patch("/api/users/Neal11")
        .send({
          inc_bug_points: "apple",
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request!");
        });
    });
    test("PATCH 400: missing data in body", () => {
      return request(app)
        .patch("/api/users/Neal11")
        .send({})
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request!");
        });
    });
    test("PATCH 400: column doesn't exist", () => {
      return request(app)
        .patch("/api/users/Neal11")
        .send({ banana: "apple" })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request!");
        });
    });
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
