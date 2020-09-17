const problemsRouter = require("express").Router();
const {
  getProblems,
  getProblemById,
} = require("../controllers/problemsController");

problemsRouter.route("/").get(getProblems);

// problemsRouter.get("/:user_id", funcHere!);

// problemsRouter.post("/new_problem", funcHere!);

problemsRouter.route("/problem_id").get(getProblemById);
// .patch(funcHere!)
// .delete(funcHere!);

// problemsRouter.route("/:problem_id/suggestions").get(funcHere!).post(funcHere!);

module.exports = problemsRouter;
