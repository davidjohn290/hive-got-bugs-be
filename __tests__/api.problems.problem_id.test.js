const app = require("../server");
const request = require("supertest");
const knex = require("../db/connection");

describe("/api/problems/problem_id", () => {
  beforeEach(() => knex.seed.run());
  afterAll(() => knex.destroy());

  describe("GET", () => {
    test("GET 200: respond with specified problem object", () => {
      return request(app)
        .get("/api/problems/1")
        .expect(200)
        .then(({ body: { problem } }) => {
          expect(problem.problem_id).toBe(1);
          expect(problem).toHaveProperty("created_at");
          expect(problem).toHaveProperty("username");
          expect(problem).toHaveProperty("difficulty");
          expect(problem).toHaveProperty("solved");
          expect(problem).toHaveProperty("tech");
          expect(problem).toHaveProperty("title");
          expect(problem).toHaveProperty("body");
        });
    });
    test("GET 404: Problem not found", () => {
      return request(app)
        .get("/api/problems/111110000")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Problem not found!");
        });
    });
    test("GET 400: problem_id is wrong type", () => {
      return request(app)
        .get("/api/problems/banana")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request!");
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
    test("DELETE 404: Problem not found", () => {
      return request(app)
        .del("/api/problems/111110000")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Problem not found!");
        });
    });
    test("DELETE 400: problem_id is wrong type", () => {
      return request(app)
        .del("/api/problems/banana")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request!");
        });
    });
  });

  describe("PATCH", () => {
    test("PATCH 200: user is able to update a problem ", () => {
      return request(app)
        .patch("/api/problems/1")
        .send({
          body: "Sometimes the best way to get a feel for a problem.",
          title: "A new title",
        })
        .expect(200)
        .then(({ body: { problem } }) => {
          expect(problem).toEqual(
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
          expect(problem.body).toBe(
            "Sometimes the best way to get a feel for a problem."
          );
          expect(problem.title).toBe("A new title");
        });
    });
    test("PATCH 404: Problem not found", () => {
      return request(app)
        .patch("/api/problems/111110000")
        .send({
          body: "Sometimes the best way to get a feel for a problem.",
        })
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Problem not found!");
        });
    });
    test("PATCH 400: problem_id is wrong type", () => {
      return request(app)
        .patch("/api/problems/banana")
        .send({
          body: "Sometimes the best way to get a feel for a problem.",
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request!");
        });
    });
    test("PATCH 400: missing body", () => {
      return request(app)
        .patch("/api/problems/1")
        .send({})
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request!");
        });
    });
    test("PATCH 400: column doesn't exist", () => {
      return request(app)
        .patch("/api/problems/1")
        .send({ banana: "apple" })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request!");
        });
    });
  });

  describe("INVALID METHODS", () => {
    test("405: request uses invalid method", () => {
      const invalidMethods = ["put", "post"];
      const methodPromises = invalidMethods.map((method) => {
        return request(app)
          [method]("/api/problems/1")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Method not allowed!");
          });
      });
      return Promise.all(methodPromises);
    });
  });
});
