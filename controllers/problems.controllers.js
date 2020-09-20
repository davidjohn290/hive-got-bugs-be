const {
  selectProblems,
  selectProblemById,
  insertAProblem,
  removeProblemById,
  updateProblemById,
  selectSuggestionsById,
  addSuggestionById,
} = require("../models/problems.models");
const { selectTechBySlug } = require("../models/tech.models");
const { selectUserByUsername } = require("../models/users.models");

exports.getProblems = (req, res, next) => {
  const { sort_by, order, solved, difficulty, tech, username } = req.query;

  let checkDB;

  if (tech && !username) {
    checkDB = selectTechBySlug(tech);
  } else if (username && !tech) {
    checkDB = selectUserByUsername(username);
  } else if (tech && username) {
    checkDB = selectTechBySlug(tech).then(() => {
      return selectUserByUsername(username);
    });
  } else checkDB = Promise.resolve();

  checkDB
    .then(() => {
      return selectProblems(sort_by, order, solved, difficulty, tech, username);
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

// Move to suggestions
exports.getSuggestionByProblemId = (req, res, next) => {
  const { problem_id } = req.params;
  selectSuggestionsById(problem_id)
    .then((suggestions) => {
      res.status(200).send({ suggestions });
    })
    .catch(next);
};

// Move to suggestions
exports.postSuggestionByProblemId = (req, res, next) => {
  const { problem_id } = req.params;
  const { body } = req;
  addSuggestionById(problem_id, body)
    .then((newSuggestion) => {
      res.status(201).send({ newSuggestion });
    })
    .catch(next);
};
