const knex = require("../db/connection");

exports.selectTechBySlug = (techSlug) => {
  return knex
    .select("*")
    .from("tech")
    .where("slug", "=", techSlug)
    .then((result) => {
      if (result.length === 0) {
        return Promise.reject({ status: 404, msg: "Tech not found!" });
      } else {
        const [tech] = result;

        return tech;
      }
    });
};

exports.selectAllTech = () => {
  return knex
    .select("*")
    .from("tech")
    .then((allTech) => {
      return allTech;
    });
};
