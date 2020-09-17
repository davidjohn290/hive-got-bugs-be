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
      })
      .then((problems) => {
        return formatBooleans(problems);
      });
  }
};
