const express = require("express");
const problemsRouter = express.Router();
const {
  getProblems,
  getProblemById,
  addAProblem,
  patchProblemById,
  deleteProblemById,
  getSuggestionByProblemId,
  postSuggestionByProblemId,
} = require("../controllers/problems.controllers");
const { handle405s } = require("../errors/");

problemsRouter.route("/").get(getProblems).post(addAProblem).all(handle405s);

problemsRouter
  .route("/:problem_id")
  .get(getProblemById)
  .patch(patchProblemById)
  .delete(deleteProblemById)
  .all(handle405s);

problemsRouter
  .route("/:problem_id/suggestions")
  .get(getSuggestionByProblemId)
  .post(postSuggestionByProblemId);

module.exports = problemsRouter;
