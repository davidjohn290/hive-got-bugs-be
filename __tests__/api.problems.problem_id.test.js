const app = require("../server");
const request = require("supertest");
const knex = require("../db/connection");

describe("/api/problems/problem_id", () => {
  beforeEach(() => knex.seed.run());
  afterAll(() => knex.destroy());

  describe("GET", () => {
    test("GET 200: response with the right problem object properties", () => {
      return request(app)
        .get("/api/problems/1")
        .expect(200)
        .then(({ body: { problemById } }) => {
          expect(problemById).toHaveProperty("problem_id");
          expect(problemById).toHaveProperty("created_at");
          expect(problemById).toHaveProperty("username");
          expect(problemById).toHaveProperty("difficulty");
          expect(problemById).toHaveProperty("solved");
          expect(problemById).toHaveProperty("tech");
          expect(problemById).toHaveProperty("title");
          expect(problemById).toHaveProperty("body");
        });
    });

    test("GET 200: response with the specified problem object", () => {
      return request(app)
        .get("/api/problems/1")
        .expect(200)
        .then(({ body: { problemById } }) => {
          expect(problemById.problem_id).toEqual(1);
        });
    });

    test("GET 400: Invalid problem request", () => {
      return request(app)
        .get("/api/problems/111110000")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Problem not found");
        });
    });

    test("GET 404: the requested problem does not exist", () => {
      return request(app)
        .get("/api/problems/10000")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Problem not found");
        });
    });
  });

  describe("DELETE", () => {
    test("DELETE: 204: - remove problem (of a given id) from the database", () => {
      return request(app)
        .del("/api/problems/1")
        .expect(204)
        .then(() => {
          return knex("problems").where("problem_id", 1);
        });
    });
  });

  describe("PATCH", () => {
    test("PATCH 200: user is able to update a problem ", () => {
      return request(app)
        .patch("/api/problems/1")
        .send({
          body: "Sometimes the best way to get a feel for a problem.",
        })
        .expect(200)
        .then(({ body: { updatedProblem } }) => {
          expect(updatedProblem).toEqual(
            expect.objectContaining({
              problem_id: expect.any(Number),
              username: expect.any(String),
              difficulty: expect.any(Number),
              created_at: expect.any(String),
              solved: expect.any(String),
              tech: expect.any(String),
              title: expect.any(String),
              body: expect.any(String),
            })
          );
          expect(updatedProblem.body).toBe(
            "Sometimes the best way to get a feel for a problem."
          );
        });
    });
  });

  test("405: request uses invalid method", () => {
    const invalidMethods = ["put", "post"];
    const methodPromises = invalidMethods.map((method) => {
      return request(app)
        [method]("/api/problems")
        .expect(405)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Method not allowed!");
        });
    });
    return Promise.all(methodPromises);
  });
});
