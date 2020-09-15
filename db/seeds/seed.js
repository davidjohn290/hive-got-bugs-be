const {
  problemsData,
  techData,
  usersData,
} = require("../data/index");

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      const techInsertions = knex("tech").insert(techData);
      const usersInsertions = knex("users").insert(usersData);
      const problemsInsertions = knex("problems").insert(problemsData);
      return Promise.all([techInsertions, usersInsertions, problemsInsertions]);
    });
};
