const {
  updateSuggestionById,
  removeSuggestionById,
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
