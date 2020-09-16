const { selectProblems } = require("../models/problems.models");

exports.getProblems = (req, res, next) => {
  const { sort_by, order, solved, tech, difficulty } = req.query;
  selectProblems(sort_by, order, solved, tech, difficulty)
    .then((problems) => {
      res.status(200).send({ problems });
    })
    .catch(next);
};
