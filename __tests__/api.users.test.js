const app = require("../server");
const request = require("supertest");
const knex = require("../db/connection");

describe("/api/problems", () => {
  beforeEach(() => knex.seed.run());
  afterAll(() => knex.destroy());
  describe("GET", () => {
    test("GET 200: responds with an array of user objects", () => {
      return request(app)
        .get("/api/users/mentors")
        .expect(200)
        .then(({ body: { mentors } }) => {
          expect(mentors).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                name: expect.any(String),
                username: expect.any(String),
                role: expect.any(String),
                created_at: expect.any(String),
                avatar_url: expect.any(String),
                online_status: expect.any(String),
                bug_points: expect.any(Number),
                bug_points_over_month: expect.any(Number),
              }),
            ])
          );
          mentors.forEach((mentor) => {
            expect(mentor.role).toBe("mentor");
          });
        });
    });
    test("GET 200: responds with a specific user object", () => {
      return request(app)
        .get("/api/users/Neal11")
        .expect(200)
        .then(({ body: { user } }) => {
          console.log(user.username);
          expect(user.username).toBe("Neal11");
        });
    });
  });
});
