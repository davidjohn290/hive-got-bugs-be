const express = require("express");
const techRouter = express.Router();
const { getTechBySlug } = require("../controllers/tech.controllers");
const { handle405s } = require("../errors/index");

// techRouter.get("/", funcHere!)

techRouter.route("/:slug").get(getTechBySlug).all(handle405s);

module.exports = techRouter;
