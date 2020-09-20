const app = require("../server");
const request = require("supertest");
const knex = require("../db/connection");

describe("/api/users", () => {
  beforeEach(() => knex.seed.run());
  afterAll(() => knex.destroy());

  describe("GET", () => {
    test("GET 200: responds with an array of users who are mentors (filter query)", () => {
      return request(app)
        .get("/api/users?role=mentor")
        .expect(200)
        .then(({ body: { users } }) => {
          expect(users).toEqual(
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
          users.forEach((user) => {
            expect(user.role).toBe("mentor");
          });
        });
    });
  });

  describe("POST", () => {
    test("POST 201: responds with the posted user object", () => {
      return request(app)
        .post("/api/users/")
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
    test("POST 400: responds with a 400 error when missing data from a post request", () => {
      return request(app)
        .post("/api/users/")
        .send({
          username: "bigAl",
        })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request!");
        });
    });
  });

  test("405: request uses an invalid method", () => {
    const invalidMethods = ["patch", "put", "delete"];
    const methodPromises = invalidMethods.map((method) => {
      return request(app)
        [method]("/api/users/")
        .expect(405)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Method not allowed!");
        });
    });
    return Promise.all(methodPromises);
  });
});
