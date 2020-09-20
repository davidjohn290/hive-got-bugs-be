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
  test("ERROR 404: responds with 404 error when passed a non exist username", () => {
    return request(app)
      .get("/api/problems/user/bigFrank")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Username does not exist!");
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

  test("Status 400: Invalid problem request", () => {
    return request(app)
      .get("/api/problems/111110000")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Problem not found");
      });
  });

  test("POST Status 201: returns a problem object containing the new problem", () => {
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
  test("Status 404: the requested problem does not exist", () => {
    return request(app)
      .get("/api/problems/10000")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Problem not found");
      });
  });

  test("ERROR 405", () => {
    return request(app)
      .post("/api/problems/023")
      .expect(405)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Method not allowed!");
      });
  });
  test("DELETE: Status 204: - remove problem (of a given id) from the database", () => {
    return request(app)
      .del("/api/problems/1")
      .expect(204)
      .then(() => {
        return knex("problems").where("problem_id", 1);
      });
  });
  test("PATCH Status 200: user is able to update a problem ", () => {
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
  test("GET 200: responds with all the suggestion objects specific to the problem Id", () => {
    return request(app)
      .get("/api/problems/1/suggestions")
      .expect(200)
      .then(({ body: { suggestions } }) => {
        console.log(suggestions);
        suggestions.forEach((suggestion) => {
          expect(suggestion.problem_id).toBe(1);
        });
      });
  });
  test("ERROR 404: responds with 404 error when given a non existent problem Id", () => {
    return request(app)
      .get("/api/problems/12323/suggestions")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Problem_id does not exist!");
      });
  });
  test("POST 201: responds with the posted suggestion object", () => {
    return request(app)
      .post("/api/problems/1/suggestions")
      .send({ username: "Neal11", body: "I think you should do this..." })
      .expect(201)
      .then(({ body: { newSuggestion } }) => {
        expect(newSuggestion.username).toBe("Neal11");
        expect(newSuggestion.problem_id).toBe(1);
      });
  });
  test("ERROR 400: responds with 404 error when missing information", () => {
    return request(app)
      .post("/api/problems/1/suggestions")
      .send({})
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request!");
      });
  });
  test("ERROR 404: responds with 404 error when given non existent problem Id", () => {
    return request(app)
      .post("/api/problems/122234/suggestions")
      .send({ username: "Neal11", body: "What a good suggestion" })
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Value not found!");
      });
  });
});
