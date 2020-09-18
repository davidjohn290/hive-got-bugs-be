const express = require("express");
const usersRouter = express.Router();
const {
  getMentors,
  getUser,
  postNewUser,
  patchNewUser,
} = require("../controllers/users.controllers");
const { handle405s } = require("../errors");

usersRouter.route("/mentors").get(getMentors).all(handle405s);

usersRouter.route("/:username").get(getUser).patch(patchNewUser);

usersRouter.post("/new_user", postNewUser);

module.exports = usersRouter;
