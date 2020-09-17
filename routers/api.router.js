const express = require("express");
const apiRouter = express.Router();
const usersRouter = require("./users.router");
const problemsRouter = require("./problems.router");
const suggestionsRouter = require("./suggestions.router");
const techRouter = require("./tech.router");

apiRouter.use("/users", usersRouter);

apiRouter.use("/problems", problemsRouter);

apiRouter.use("/suggestions", suggestionsRouter);

apiRouter.use("/tech", techRouter);

module.exports = apiRouter;
