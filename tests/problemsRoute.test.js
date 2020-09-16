const app = require("../app");
const request = require("../supertest");
const knex = require("../db/connection");

describe("api/problems", () => {
  beforeEach(() => knex.seed.run());
  afterAll(() => knex.destroy());
  describe("/", () => {
    test("GET 200: responds with an array of problem objects, with default sort and filter options", () => {
      return request(app)
        .get("/api/problems")
        .expect(200)
        .then(({ body: problems }) => {
          expect(problems.length).toBe(10);
          expect(problems).toBeSortedBy("created_at", { descending: true });
          problems.forEach((problem) => {
            expect(problem).toEqual(
              expect.objectContaining({
                problem_id: expect.any(Number),
                created_at: expect.any(Date),
                difficulty: expect.any(Number),
                solved: expect.toBe(false),
                tech: expect.any(String),
                title: expect.any(String),
                body: expect.any(String),
              })
            );
          });
        });
    });
  });
});
