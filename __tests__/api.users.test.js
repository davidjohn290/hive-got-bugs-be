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
          expect(user.username).toBe("Neal11");
        });
    });
    test("POST 201: responds with the posted user object", () => {
      return request(app)
        .post("/api/users/new_user")
        .send({
          username: "originalCoder",
          name: "John Smith",
          avatar_url:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
          online_status: "offline",
          bug_points: 0,
          bug_points_over_month: 0,
          role: "user",
        })
        .expect(201)
        .then(({ body: { newUser } }) => {
          expect(newUser).toEqual(
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
          expect(newUser[0].username).toBe("originalCoder");
          expect(newUser[0].name).toBe("John Smith");
        });
    });
    test("PATCH 200: responds with the updated user object ", () => {
      return request(app)
        .patch("/api/users/Neal11")
        .send({
          bug_points: 3,
        })
        .expect(200)
        .then(({ body: { updatedUser } }) => {
          expect(updatedUser.username).toBe("Neal11");
          expect(updatedUser.bug_points).toBe(35);
        });
    });
    test("PATCH 200: responds with the updated user object", () => {
      return request(app)
        .patch("/api/users/Neal11")
        .send({ description: "I'm a brilliant coder." })
        .expect(200)
        .then(({ body: { updatedUser } }) => {
          expect(updatedUser.username).toBe("Neal11");
          expect(updatedUser.description).toBe("I'm a brilliant coder.");
        });
    });
    test("Error 400: responds with 400 error when passed an invalid username", () => {
      return request(app)
        .get("/api/users/hello")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Username does not exist");
        });
    });
    test("Error 400: responds with a 400 error when missing data from a post request", () => {
      return request(app)
        .post("/api/users/new_user")
        .send({
          username: "bigAl",
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request!");
        });
    });
    test("Error 400: responds with a 400 error when trying to update a property that doesn't exist", () => {
      return request(app)
        .patch("/api/users/Neal11")
        .send({ points: 2 })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request!");
        });
    });
    test("Error 405: responds with a 405 when a request uses an invalid method", () => {
      const invalidMethods = ["post", "patch", "delete"];
      const methodPromises = invalidMethods.map((method) => {
        return request(app)
          [method]("/api/users/mentors")
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("Method not allowed!");
          });
      });
      return Promise.all(methodPromises);
    });
  });
});
