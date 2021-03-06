const express = require("express");
const app = express();
const apiRouter = require("./routers/api.router");
const cors = require("cors");

const {
  handlePSQL400Errors,
  handlePSQL422Errors,
  handleCustomErrors,
  handle500s,
} = require("./errors/");

app.use(cors());

app.use(express.json());
app.use("/api", apiRouter);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Route not found!" });
});

app.use(handlePSQL400Errors);
app.use(handlePSQL422Errors);
app.use(handleCustomErrors);
app.use(handle500s);

module.exports = app;
