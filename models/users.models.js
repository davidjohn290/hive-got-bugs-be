const knex = require("../db/connection");

exports.selectMentors = () => {
  return knex
    .select("*")
    .from("users")
    .where("role", "mentor")
    .then((mentors) => {
      return mentors;
    });
};

exports.selectUserByUsername = (username) => {
  return knex
    .select("*")
    .from("users")
    .where("username", username)
    .then((user) => {
      return user[0];
    });
};
