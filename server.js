const express = require("express");
const app = express();
const apiRouter = require("./routers/api.router");
const {
  handlePSQL400Errors,
  handlePSQL404Errors,
  handleCustomErrors,
  handle500s,
} = require("./errors/");

app.use(express.json());
app.use("/api", apiRouter);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Route not found!" });
});

app.use(handlePSQL400Errors);
app.use(handlePSQL404Errors);
app.use(handleCustomErrors);
app.use(handle500s);

module.exports = app;
