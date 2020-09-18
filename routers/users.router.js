const express = require("express");
const usersRouter = express.Router();
const { getMentors, getUser } = require("../controllers/users.controllers");

usersRouter.get("/mentors", getMentors);

usersRouter.route("/:username").get(getUser);
//.patch(funcHere!).post(funcHere!).delete(funcHere!).all(funcHere!);

// usersRouter.post("/new_user", funcHere!);

// usersRouter.patch(":user_id/online_status", funcHere!);

module.exports = usersRouter;
