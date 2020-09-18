const express = require("express");
const problemsRouter = express.Router();
const {
  getProblems,
  getProblemById,
} = require("../controllers/problems.controllers");
const { handle405s } = require("../errors/");

problemsRouter.route("/").get(getProblems).all(handle405s);

// problemsRouter.get("/:user_id", funcHere!);

// problemsRouter.post("/new_problem", funcHere!);

problemsRouter.route("/problem_id").get(getProblemById);
// .patch(funcHere!)
// .delete(funcHere!);

// problemsRouter.route("/:problem_id/suggestions").get(funcHere!).post(funcHere!);

module.exports = problemsRouter;
