const app = require("../server");
const request = require("../supertest");
const knex = require("../db/connection");

describe("ProblemById", () => {
  beforeEach(() => knex.seed.run());
  afterAll(() => knex.destroy());

  test("STATUS 200: response with a problem object", () => {
    return request(app)
      .get("api/problems/1")
      .expect(200)
      .then(({ body: { problemById } }) => {
        expect(problemById.problem_id).toEqual(1);
      });
  });
});
