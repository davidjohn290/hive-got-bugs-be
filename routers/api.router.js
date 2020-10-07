const express = require("express");
const apiRouter = express.Router();
const usersRouter = require("./users.router");
const problemsRouter = require("./problems.router");
const suggestionsRouter = require("./suggestions.router");
const techRouter = require("./tech.router");
const { handle405s } = require("../errors");
const { getAPIDescription } = require("../controllers/api.controllers");

apiRouter.route("/").get(getAPIDescription).all(handle405s);

apiRouter.use("/users", usersRouter);

apiRouter.use("/problems", problemsRouter);

apiRouter.use("/suggestions", suggestionsRouter);

apiRouter.use("/tech", techRouter);

module.exports = apiRouter;
