const express = require("express");
const usersRouter = express.Router();

const {
  getUsers,
  getUserByUsername,
  postNewUser,
  patchNewUser,
} = require("../controllers/users.controllers");

const { handle405s } = require("../errors");

usersRouter.route("/").get(getUsers).post(postNewUser).all(handle405s);

usersRouter
  .route("/:username")
  .get(getUserByUsername)
  .patch(patchNewUser)
  .all(handle405s);

module.exports = usersRouter;
