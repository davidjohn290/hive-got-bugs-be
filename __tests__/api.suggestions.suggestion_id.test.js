const app = require("../server");
const request = require("supertest");
const knex = require("../db/connection");

describe("/api/suggestions/:suggestion_id", () => {
  beforeEach(() => knex.seed.run());
  afterAll(() => knex.destroy());

  describe("PATCH", () => {
    test("PATCH 200: responds with the updated suggestion object", () => {
      return request(app)
        .patch("/api/suggestions/16")
        .send({ body: "updated body for test!" })
        .expect(200)
        .then(({ body: { updatedSuggestion } }) => {
          expect(updatedSuggestion.body).toBe("updated body for test!");
        });
    });
    test("PATCH 404: suggestion not found", () => {
      return request(app)
        .patch("/api/suggestions/99999")
        .send({ body: "updated body for test!" })
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Suggestion not found!");
        });
    });
    test("PATCH 400: suggestion_id wrong type", () => {
      return request(app)
        .patch("/api/suggestions/banana")
        .send({ body: "updated body for test!" })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request!");
        });
    });
    test("PATCH 400: missing data in body", () => {
      return request(app)
        .patch("/api/suggestions/16")
        .send({})
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request!");
        });
    });
    test("PATCH 400: column doesn't exist", () => {
      return request(app)
        .patch("/api/suggestions/16")
        .send({ banana: "apple" })
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request!");
        });
    });
  });

  describe("DELETE", () => {
    test("DELETE 204: responds with a 204 status code when successfully deleted", () => {
      return request(app).del("/api/suggestions/16").expect(204);
    });
    test("DELETE 404: responds with a 404 error when no suggestion Id exists", () => {
      return request(app)
        .del("/api/suggestions/1213")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Suggestion Id not found!");
        });
    });
    test("DELETE 400: responds with a 400 error when suggestion Id wrong type", () => {
      return request(app)
        .del("/api/suggestions/suggestion1")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request!");
        });
    });
  });

  describe("INVALID METHODS", () => {
    test("405: request uses invalid method", () => {
      const invalidMethods = ["get", "post", "put"];
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
});
