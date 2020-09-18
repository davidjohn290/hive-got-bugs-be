const express = require("express");
const problemsRouter = express.Router();
const {
  getProblems,
  getProblemById,
  addAProblem,
  patchProblemById,
  deleteProblemById,
  getProblemsByUsername,
  getSuggestionById,
  postSuggestionById,
} = require("../controllers/problems.controllers");
const { handle405s } = require("../errors/");

problemsRouter.route("/").get(getProblems).all(handle405s);

problemsRouter.get("/user/:username", getProblemsByUsername);

problemsRouter.post("/new_problem", addAProblem).all(handle405s);

problemsRouter
  .route("/:problem_id")
  .get(getProblemById)
  .patch(patchProblemById)
  .delete(deleteProblemById)
  .all(handle405s);

problemsRouter
  .route("/:problem_id/suggestions")
  .get(getSuggestionById)
  .post(postSuggestionById);

module.exports = problemsRouter;
