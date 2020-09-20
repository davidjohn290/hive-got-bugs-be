const express = require("express");
const usersRouter = express.Router();
const {
  getMentors,
  getUser,
  postNewUser,
  patchNewUser,
} = require("../controllers/users.controllers");
const { handle405s } = require("../errors");

usersRouter.route("/").post(postNewUser).all(handle405s);

usersRouter.route("/mentors").get(getMentors).all(handle405s);

usersRouter
  .route("/:username")
  .get(getUser)
  .patch(patchNewUser)
  .all(handle405s);

module.exports = usersRouter;
