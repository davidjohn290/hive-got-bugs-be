const knex = require("../db/connection");

exports.selectProblems = () => {
  return knex.select("*").from("problems");
};
