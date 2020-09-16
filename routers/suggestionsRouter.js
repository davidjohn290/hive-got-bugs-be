const express = require("express");
const suggestionsRouter = express.Router();

suggestionsRouter.route("/:suggestion_id");
// .patch(funcHere!)
// .delete(funcHere!);

module.exports = suggestionsRouter;
