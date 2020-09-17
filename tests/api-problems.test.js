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
    describe("Sort queries", () => {
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
    describe("Filter queries", () => {
      test("GET 200: filter by difficulty", () => {
        return request(app)
          .get("/api/problems/?difficulty=2")
          .expect(200)
          .then(({ body: { problems } }) => {
            expect(problems.length).toBe(1);
            problems.forEach((problem) => {
              expect(problem.difficulty).toBe(2);
            });
          });
      });
      test("GET 200: filter by tech", () => {
        return request(app)
          .get("/api/problems/?tech=JavaScript")
          .expect(200)
          .then(({ body: { problems } }) => {
            expect(problems.length).toBe(1);
            problems.forEach((problem) => {
              expect(problem.tech).toBe("JavaScript");
            });
          });
      });
      test("GET 200: filter by solved", () => {
        return request(app)
          .get("/api/problems/?solved=false")
          .expect(200)
          .then(({ body: { problems } }) => {
            expect(problems.length).toBe(8);
            problems.forEach((problem) => {
              expect(problem.solved).toBe(false);
            });
          });
      });
      test("GET 200: filter by multiple columns", () => {
        return request(app)
          .get("/api/problems/?solved=true&difficulty=0")
          .expect(200)
          .then(({ body: { problems } }) => {
            expect(problems.length).toBe(1);
            problems.forEach((problem) => {
              expect(problem.solved).toBe(true);
              expect(problem.difficulty).toBe(0);
            });
          });
      });
      test("GET 404: tech does not exist", () => {
        return request(app)
          .get("/api/problems?tech=bannana")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Tech not found!");
          });
      });
      test("GET 200: tech exists but no results", () => {
        return request(app)
          .get("/api/problems?tech=Python")
          .expect(200)
          .then(({ body: { problems } }) => {
            expect(problems.length).toBe(0);
          });
      });
    });
  });
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
