const app = require("../server");
const request = require("supertest");
const knex = require("../db/connection");

describe("/api/problems", () => {
  beforeEach(() => knex.seed.run());
  afterAll(() => knex.destroy());
  describe("GET", () => {
    test("GET 200: responds with an array of problem objects", () => {
      return request(app)
        .get("/api/problems")
        .expect(200)
        .then(({ body: { problems } }) => {
          expect(problems.length).toBe(10);
          expect(problems).toBeSortedBy("created_at", { descending: true });
          problems.forEach((problem) => {
            expect(problem).toEqual(
              expect.objectContaining({
                problem_id: expect.any(Number),
                created_at: expect.any(String),
                difficulty: expect.any(Number),
                solved: expect.any(Boolean),
                tech: expect.any(String),
                title: expect.any(String),
                body: expect.any(String),
              })
            );
          });
        });
    });
    test("GET 200: custom sort order", () => {
      return request(app)
        .get("/api/problems?order=asc")
        .expect(200)
        .then(({ body: { problems } }) => {
          expect(problems.length).toBe(10);
          expect(problems).toBeSortedBy("created_at", { descending: false });
        });
    });
    test("GET 200: custom sort column", () => {
      return request(app)
        .get("/api/problems?sort_by=difficulty&order=desc")
        .expect(200)
        .then(({ body: { problems } }) => {
          expect(problems.length).toBe(10);
          expect(problems).toBeSortedBy("difficulty", { descending: true });
        });
    });
    test("GET 200: invalid query", () => {
      return request(app)
        .get("/api/problems?apple=bannana")
        .expect(200)
        .then(({ body: { problems } }) => {
          expect(problems.length).toBe(10);
          expect(problems).toBeSortedBy("created_at", { descending: true });
        });
    });
    test("GET 400: invalid sort order", () => {
      return request(app)
        .get("/api/problems?sort_by=difficulty&order=bannana")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request!");
        });
    });
    test("GET 400: invalid sort column", () => {
      return request(app)
        .get("/api/problems?sort_by=apple")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request!");
        });
    });
  });
});
