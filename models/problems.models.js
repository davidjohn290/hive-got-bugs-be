const knex = require("../db/connection");
const { formatBooleans } = require("../utils/modelsHelpers");

exports.selectProblems = (
  sort_by = "created_at",
  order = "desc",
  solved,
  difficulty,
  tech,
  username
) => {
  if (order !== "asc" && order !== "desc") {
    return Promise.reject({ status: 400, msg: "Bad request!" });
  } else {
    return knex
      .select("*")
      .from("problems")
      .orderBy(sort_by, order)
      .modify((query) => {
        if (solved !== undefined) query.where("solved", "=", solved);
        if (difficulty) query.where("difficulty", "=", difficulty);
        if (tech) query.where("tech", "=", tech);
        if (username) query.where("username", "=", username);
      })
      .then((problems) => {
        return formatBooleans(problems);
      });
  }
};

exports.selectProblemById = (problem_id) => {
  return knex
    .select("*")
    .from("problems")
    .where("problems.problem_id", problem_id)
    .then((problem) => {
      if (problem.length === 0)
        return Promise.reject({ status: 404, msg: "Problem not found!" });
      else {
        return problem[0];
      }
    });
};

exports.insertAProblem = (body) => {
  return knex("problems")
    .insert(body)
    .where("username", body.username)
    .returning("*")
    .then((body) => {
      body[0].solved = false;
      return body[0];
    });
};

exports.updateProblemById = (body, id) => {
  return knex
    .select("*")
    .from("problems")
    .where("problem_id", id)
    .update(body)
    .returning("*")
    .then((updatedProblem) => {
      if (updatedProblem.length === 0) {
        return Promise.reject({ status: 404, msg: "Problem not found!" });
      } else return updatedProblem[0];
    });
};

exports.removeProblemById = (problem_id) => {
  return knex("*")
    .from("problems")
    .where("problem_id", problem_id)
    .del()
    .returning("*")
    .then((deleted) => {
      if (deleted.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Problem not found!",
        });
      }
    });
};
