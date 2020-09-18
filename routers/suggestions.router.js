const express = require("express");
const suggestionsRouter = express.Router();
const {
  patchSuggestion,
  deleteSuggestion,
} = require("../controllers/suggestions.controllers");
const { handle405s } = require("../errors");

suggestionsRouter
  .route("/:suggestion_id")
  .patch(patchSuggestion)
  .delete(deleteSuggestion)
  .all(handle405s);

module.exports = suggestionsRouter;
