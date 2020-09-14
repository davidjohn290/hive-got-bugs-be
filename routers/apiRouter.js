const express = require("express");
const apiRouter = express.Router();

apiRouter.use("/users");

apiRouter.use("/problems");

apiRouter.use("/suggestions");

apiRouter.use("/tech");

module.exports = apiRouter;
