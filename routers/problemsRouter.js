const express = require("express");
problemsRouter = express.Router();

problemsRouter.get("/", funcHere!);

problemsRouter.get("/:user_id", funcHere!);

problemsRouter.post("/new_problem", funcHere!);

problemsRouter.route("/problem_id").get(funcHere!).patch(funcHere!).delete(funcHere!);

problemsRouter.route("/:problem_id/suggestions").get(funcHere!).post(funcHere!);

module.exports = problemsRouter;
