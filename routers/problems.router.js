const express = require("express");
const problemsRouter = express.Router();
const {
  getProblems,
  getProblemById,
  addAProblem,
  patchProblemById,
  deleteProblemById,
} = require("../controllers/problems.controllers");
const { handle405s } = require("../errors/");

problemsRouter.route("/").get(getProblems).all(handle405s);

// problemsRouter.get("/:user_id", funcHere!);

problemsRouter.post("/new_problem", addAProblem);

problemsRouter
  .route("/:problem_id")
  .get(getProblemById)
  .patch(patchProblemById)
  .delete(deleteProblemById);

// problemsRouter.route("/:problem_id/suggestions").get(funcHere!).post(funcHere!);

module.exports = problemsRouter;
