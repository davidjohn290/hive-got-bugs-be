const knex = require("../db/connection");
const { formatBooleans } = require("../utils/modelsHelpers");

exports.selectProblems = (
  sort_by = "created_at",
  order = "desc",
  solved,
  difficulty,
  tech
) => {
  if (order !== "asc" && order !== "desc") {
    return Promise.reject({ status: 400, msg: "Invalid problem request" });
  } else {
    return knex
      .select("*")
      .from("problems")
      .orderBy(sort_by, order)
      .modify((query) => {
        if (solved !== undefined) query.where("solved", "=", solved);
        if (difficulty) query.where("difficulty", "=", difficulty);
        if (tech) query.where("tech", "=", tech);
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
        return Promise.reject({ status: 404, msg: "Problem not found" });
      else {
        return problem[0];
      }
    });
};

exports.insertAProblem = (body) => {
  return knex("problems")
    .insert({
      username: body.username,
      difficulty: body.difficulty,
      solved: body.solved,
      tech: body.tech,
      title: body.title,
      body: body.body,
    })
    .where("username", body.username)
    .returning("*")
    .then((body) => {
      body[0].solved = false;
      return body[0];
    });
};

exports.updateProblemById = (body) => {
  return knex("problems")
    .from("problems")
    .update({
      username: body.username,
      difficulty: body.difficulty,
      solved: body.solved,
      tech: body.tech,
      title: body.title,
      body: body.body,
    })
    .where("username", body.username)
    .returning("*")
    .then(() => {
      return body[0];
    });
};
exports.removeProblemById = (problem_id) => {
  return knex("problems")
    .from("problems")
    .where({ problem_id })
    .del()
    .returning("*")
    .then((deleted) => {
      if (deleted === 0) {
        console.log(deleted);
        return Promise.reject({
          status: 404,
          msg: "Problem not found",
        });
      }
    });
};
