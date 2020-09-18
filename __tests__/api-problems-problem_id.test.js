const app = require("../server");
const request = require("supertest");
const knex = require("../db/connection");

describe.only("ProblemById", () => {
  beforeEach(() => knex.seed.run());
  afterAll(() => knex.destroy());

  test("GET - status 200: response with the right problem object properties", () => {
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

  test("GET - status 200: response with the specified problem object", () => {
    return request(app)
      .get("/api/problems/1")
      .expect(200)
      .then(({ body: { problemById } }) => {
        expect(problemById.problem_id).toEqual(1);
      });
  });

  test.skip("Status 400: Invalid problem request", () => {
    return request(app)
      .get("/api/problems/111110000")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request!");
      });
  });

  test.only("POST Status 201: returns a problem object containing the new problem", () => {
    return request(app)
      .post("/api/problems/new_problem")
      .send({
        username: "Neal11",
        difficulty: 2,
        solved: false,
        tech: "JavaScript",
        title: "How to discard local file modifications in git",
        body:
          "Sometimes the best way to get a feel for a problem is diving in and playing around with the code.",
      })
      .expect(201)
      .then(({ body: { newProblem } }) => {
        expect(newProblem).toEqual(
          expect.objectContaining({
            problem_id: expect.any(Number),
            username: "Neal11",
            difficulty: 2,
            created_at: expect.any(String),
            solved: false,
            tech: "JavaScript",
            title: "How to discard local file modifications in git",
            body:
              "Sometimes the best way to get a feel for a problem is diving in and playing around with the code.",
          })
        );
      });
  });
  test.skip("Status 404: the requested problem does not exist", () => {
    return request(app)
      .get("/api/problems/10000")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Problem not found");
      });
  });

  test.skip("INVALID METHODS", () => {
    const invalidMethods = ["patch", "post", "delete"];
    const requests = invalidMethods.map((method) => {
      return request(app)
        [method]("/api/problem/problem_id")
        .expect(405)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Method not allowed.");
        });
    });

    return Promise.all(requests);
  });
  test.only("DELETE: Status 204: - remove problem (of a given id) from the database", () => {
    return request(app)
      .del("/api/problems/1")
      .expect(204)
      .then(() => {
        return knex("problems").where("problem_id", 1);
      });
  });

  test("PUT Status 200: user is able to update a problem ", () => {
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
