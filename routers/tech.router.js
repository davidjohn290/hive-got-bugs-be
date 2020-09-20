const express = require("express");
const techRouter = express.Router();
const {
  getTechBySlug,
  getAllTech,
} = require("../controllers/tech.controllers");
const { handle405s } = require("../errors/index");

techRouter.route("/").get(getAllTech).all(handle405s);

techRouter.route("/:slug").get(getTechBySlug).all(handle405s);

module.exports = techRouter;
