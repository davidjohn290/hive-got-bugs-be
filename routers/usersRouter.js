const express = require("express");
const usersRouter = express.Router();

usersRouter.get("/mentors", funcHere!);

usersRouter.route("/:user_id").get(funcHere!).patch(funcHere!).post(funcHere!).delete(funcHere!).all(funcHere!);

usersRouter.post("/new_user", funcHere!);

usersRouter.patch(":user_id/online_status", funcHere!);

module.exports = userRouter;
