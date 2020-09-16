const express = require("express");
const apiRouter = express.Router();
const usersRouter = require("./usersRouter");
const problemsRouter = require("./problemsRouter");
const suggestionsRouter = require("./suggestionsRouter");
const techRouter = require("./techRouter");

apiRouter.use("/users", usersRouter);

apiRouter.use("/problems", problemsRouter);

apiRouter.use("/suggestions", suggestionsRouter);

apiRouter.use("/tech", techRouter);

module.exports = apiRouter;