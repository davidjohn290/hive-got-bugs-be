const knex = require("../db/connection");

exports.updateSuggestionById = (id, body) => {
  const propertyToChange = Object.keys(body)[0];
  const newValue = body[propertyToChange];
  return knex
    .select("*")
    .from("suggestions")
    .where("suggestion_id", id)
    .update({ [propertyToChange]: newValue })
    .returning("*")
    .then((updatedSuggestion) => {
      if (updatedSuggestion === 0)
        return Promise.reject({ status: 404, msg: "Suggestion Id not found!" });
      else return updatedSuggestion[0];
    });
};

exports.removeSuggestionById = (id) => {
  return knex
    .select("*")
    .from("suggestions")
    .where("suggestion_id", id)
    .del()
    .then((res) => {
      if (res === 0) {
        return Promise.reject({ status: 404, msg: "Suggestion Id not found!" });
      }
    });
};
