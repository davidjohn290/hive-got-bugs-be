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
          .get("/api/problems?apple=banana")
          .expect(200)
          .then(({ body: { problems } }) => {
            expect(problems.length).toBe(10);
            expect(problems).toBeSortedBy("created_at", { descending: true });
          });
      });
      test("GET 400: invalid sort order", () => {
        return request(app)
          .get("/api/problems?sort_by=difficulty&order=banana")
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
      test("GET 200: filter by username", () => {
        return request(app)
          .get("/api/problems?username=Neal11")
          .expect(200)
          .then(({ body: { problems } }) => {
            problems.forEach((problem) => {
              expect(problem.username).toBe("Neal11");
            });
          });
      });
      test("GET 200: filter by multiple columns", () => {
        return request(app)
          .get("/api/problems/?solved=true&difficulty=0&tech=Java")
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
          .get("/api/problems?tech=banana")
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
      test("GET 404: user does not exist", () => {
        return request(app)
          .get("/api/problems?username=bigFrank")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("User does not exist!");
          });
      });
      test("GET 200: user exists but no results", () => {
        return request(app)
          .get("/api/problems?username=lurker")
          .expect(200)
          .then(({ body: { problems } }) => {
            expect(problems.length).toBe(0);
          });
      });
    });
  });

  describe("POST", () => {
    test("POST 201: returns a problem object containing the new problem", () => {
      return request(app)
        .post("/api/problems/")
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
        .then(({ body: { problem } }) => {
          expect(problem).toEqual(
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
    test("POST 400: missing required fields", () => {
      return request(app)
        .post("/api/problems/")
        .send({
          difficulty: 2,
          solved: false,
          tech: "JavaScript",
          title: "How to discard local file modifications in git",
          body:
            "Sometimes the best way to get a feel for a problem is diving in and playing around with the code.",
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request!");
        });
    });
    test("POST 400: wrong type in body", () => {
      return request(app)
        .post("/api/problems/")
        .send({
          username: "Neal11",
          difficulty: "banana",
          solved: false,
          tech: "JavaScript",
          title: "How to discard local file modifications in git",
          body:
            "Sometimes the best way to get a feel for a problem is diving in and playing around with the code.",
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request!");
        });
    });
    test("POST 400: trying to add non-existent column", () => {
      return request(app)
        .post("/api/problems/")
        .send({
          username: "Neal11",
          difficulty: 1,
          solved: false,
          tech: "JavaScript",
          title: "How to discard local file modifications in git",
          body: "Sometimes the best way",
          banana: "apple",
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request!");
        });
    });
    test("POST 422: body syntactically correct, but username not found", () => {
      return request(app)
        .post("/api/problems/")
        .send({
          username: "NotAUser",
          difficulty: 1,
          solved: false,
          tech: "JavaScript",
          title: "How to discard local file modifications in git",
          body: "Sometimes the best way",
        })
        .expect(422)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Unprocessable entity!");
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
