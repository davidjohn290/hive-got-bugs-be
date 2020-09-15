const express = require("express");
suggestionsRouter = express.Router();

suggestionsRouter.route("/:suggestion_id");
// .patch(funcHere!)
// .delete(funcHere!);

module.exports = suggestionsRouter;
