const app = require("../server");
const request = require("supertest");
const knex = require("../db/connection");

describe("/api/problems/:problem_id/suggestions", () => {
  beforeEach(() => knex.seed.run());
  afterAll(() => knex.destroy());

  describe("GET", () => {
    test("GET 200: responds with all the suggestion objects specific to the problem Id", () => {
      return request(app)
        .get("/api/problems/1/suggestions")
        .expect(200)
        .then(({ body: { suggestions } }) => {
          suggestions.forEach((suggestion) => {
            expect(suggestion.problem_id).toBe(1);
          });
        });
    });
    test("GET 404: responds with 404 error when given a non existent problem Id", () => {
      return request(app)
        .get("/api/problems/12323/suggestions")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Problem_id does not exist!");
        });
    });
    test("GET 400: problem_id wrong type", () => {
      return request(app)
        .get("/api/problems/banana/suggestions")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request!");
        });
    });
  });

  describe("POST", () => {
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
    test("POST 400: missing information", () => {
      return request(app)
        .post("/api/problems/1/suggestions")
        .send({})
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request!");
        });
    });
    test("POST 422: body syntactically correct but problem_id not found ", () => {
      return request(app)
        .post("/api/problems/122234/suggestions")
        .send({ username: "Neal11", body: "What a good suggestion" })
        .expect(422)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Unprocessable entity!");
        });
    });
    test("POST 400: problem_id wrong type", () => {
      return request(app)
        .post("/api/problems/banana/suggestions")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request!");
        });
    });
  });

  describe("INVALID METHODS", () => {
    test("405: when request uses invalid method", () => {
      const invalidMethods = ["put", "patch", "delete"];
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
});
