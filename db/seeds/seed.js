const {
  problemsData,
  suggestionsData,
  techData,
  usersData,
} = require("../data/index");
const { makeRefObj, replaceKey } = require("../../db/utils/seedHelpers");

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      const techInsertions = knex("tech").insert(techData);
      const usersInsertions = knex("users").insert(usersData);
      return Promise.all([techInsertions, usersInsertions]);
    })
    .then(() => {
      return knex("problems").insert(problemsData).returning("*");
    })
    .then((problemsRows) => {
      const suggestionsRef = makeRefObj(problemsRows, "title", "problem_id");
      const formattedSuggestions = replaceKey(
        suggestionsData,
        suggestionsRef,
        "problem_id",
        "belongs_to"
      );
      return knex("suggestions").insert(formattedSuggestions);
    });
};
