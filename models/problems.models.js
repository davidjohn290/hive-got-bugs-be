const knex = require("../db/connection");
const { formatBooleans } = require("../utils/modelsHelpers");

exports.selectProblems = (sort_by = "created_at", order = "desc", solved) => {
  if (order !== "asc" && order !== "desc") {
    return Promise.reject({ status: 400, msg: "Bad request!" });
  } else {
    return knex
      .select("*")
      .from("problems")
      .orderBy(sort_by, order)
      .modify((query) => {
        if (solved) query.where("solved", "=", solved);
      })
      .then((problems) => {
        return formatBooleans(problems);
      });
  }
};
