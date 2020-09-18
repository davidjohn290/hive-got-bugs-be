const {
  selectProblems,
  selectProblemById,
  insertAProblem,
  removeProblemById,
  updateProblemById,
} = require("../models/problems.models");
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

exports.addAProblem = (req, res, next) => {
  insertAProblem(req.body)
    .then((newProblem) => res.status(201).send({ newProblem }))
    .catch((err) => {
      next(err);
    });
};

exports.patchProblemById = (req, res, next) => {
  const { body } = req;
  const { problem_id } = req.params;
  updateProblemById(body, problem_id)
    .then((updatedProblem) => {
      res.status(200).send({ updatedProblem });
    })
    .catch(next);
};

exports.deleteProblemById = (req, res, next) => {
  const { problem_id } = req.params;

  removeProblemById(problem_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};
