const app = require("../server");
const request = require("supertest");
const knex = require("../db/connection");

describe("/api/suggestions", () => {
  beforeEach(() => knex.seed.run());
  afterAll(() => knex.destroy());
  test("PATCH 200: responds with the updated suggestion object", () => {
    return request(app)
      .patch("/api/suggestions/16")
      .send({ body: "updated body for test!" })
      .expect(200)
      .then(({ body: { updatedSuggestion } }) => {
        expect(updatedSuggestion.body).toBe("updated body for test!");
      });
  });
  test("DELETE 204: responds with a 204 status code when successfully deleted", () => {
    return request(app).del("/api/suggestions/16").expect(204);
  });
  test("ERROR 404: responds with a 404 error when no suggestion Id exists", () => {
    return request(app)
      .del("/api/suggestions/1213")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Suggestion Id not found!");
      });
  });
  test("Error 405: responds with a 405 when a request uses an invalid method", () => {
    const invalidMethods = ["get", "post"];
    const methodPromises = invalidMethods.map((method) => {
      return request(app)
        [method]("/api/suggestions/16")
        .expect(405)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Method not allowed!");
        });
    });
    return Promise.all(methodPromises);
  });
});
