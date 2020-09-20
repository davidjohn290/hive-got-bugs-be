const {
  updateSuggestionById,
  removeSuggestionById,
  selectSuggestionsByProblemId,
  addSuggestionByProblemId,
} = require("../models/suggestions.models");

exports.patchSuggestion = (req, res, next) => {
  const { suggestion_id } = req.params;
  const { body } = req;
  updateSuggestionById(suggestion_id, body)
    .then((updatedSuggestion) => {
      res.status(200).send({ updatedSuggestion });
    })
    .catch(next);
};

exports.deleteSuggestion = (req, res, next) => {
  const { suggestion_id } = req.params;
  removeSuggestionById(suggestion_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};

exports.getSuggestionByProblemId = (req, res, next) => {
  const { problem_id } = req.params;
  selectSuggestionsByProblemId(problem_id)
    .then((suggestions) => {
      res.status(200).send({ suggestions });
    })
    .catch(next);
};

exports.postSuggestionByProblemId = (req, res, next) => {
  const { problem_id } = req.params;
  const { body } = req;
  addSuggestionByProblemId(problem_id, body)
    .then((newSuggestion) => {
      res.status(201).send({ newSuggestion });
    })
    .catch(next);
};
