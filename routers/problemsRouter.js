const express = require("express");
const problemsRouter = express.Router();
const { getProblems } = require("../controllers/problemsController");

problemsRouter.get("/", getProblems);

// problemsRouter.get("/:user_id", funcHere!);

// problemsRouter.post("/new_problem", funcHere!);

// problemsRouter.route("/problem_id").get(funcHere!).patch(funcHere!).delete(funcHere!);

// problemsRouter.route("/:problem_id/suggestions").get(funcHere!).post(funcHere!);

module.exports = problemsRouter;