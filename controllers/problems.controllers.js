const { selectProblems } = require("../models/problems.models");
const { selectTechBySlug } = require("../models/tech.models");

exports.getProblems = (req, res, next) => {
  const { sort_by, order, solved, difficulty, tech } = req.query;
  let checkDB;

  if (tech) {
    checkDB = selectTechBySlug(tech);
  } else checkDB = Promise.resolve();

  checkDB
    .then(() => {
      return selectProblems(sort_by, order, solved, difficulty, tech);
    })
    .then((problems) => {
      res.status(200).send({ problems });
    })
    .catch(next);
};
