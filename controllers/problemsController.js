const {
  selectProblems,
  selectProblemById,
} = require("../models/problemsModels");

exports.getProblems = (req, res) => {
  selectProblems().then((problems) => {
    res.status(200).send({ problems });
  });
};

exports.getProblemById = (req, res, next) => {
  const { problem_id } = req.params;
  selectProblemById(problem_id)
    .then((problemById) => {
      res.status(200).send({ problemById });
    })
    .catch((err) => {
      next(err);
    });
};
