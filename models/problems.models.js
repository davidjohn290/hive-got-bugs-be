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

exports.updateProblemById = (body, id) => {
  const propertyToUpdate = Object.keys(body)[0];
  const newValue = body[propertyToUpdate];
  return knex
    .select("*")
    .from("problems")
    .where("problem_id", id)
    .update({
      [propertyToUpdate]: newValue,
    })
    .returning("*")
    .then((updatedProblem) => {
      return updatedProblem[0];
    });
};
exports.removeProblemById = (problem_id) => {
  return knex("*")
    .from("problems")
    .where("problem_id", problem_id)
    .del()
    .returning("*")
    .then((deleted) => {
      if (deleted === 0) {
        return Promise.reject({
          status: 404,
          msg: "Problem not found",
        });
      }
    });
};

exports.selectSuggestionsById = (id) => {
  return knex
    .select("*")
    .from("suggestions")
    .where("problem_id", id)
    .then((suggestions) => {
      if (suggestions.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Problem_id does not exist!",
        });
      } else return suggestions;
    });
};

exports.addSuggestionById = (id, { username, body }) => {
  return knex("suggestions")
    .where("problem_id", id)
    .insert({
      problem_id: id,
      username: username,
      body: body,
    })
    .returning("*")
    .then((newSuggestion) => {
      return newSuggestion[0];
    });
};
