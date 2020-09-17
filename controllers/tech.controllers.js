const { selectTechBySlug } = require("../models/tech.models");

exports.getTechBySlug = (req, res, next) => {
  const { slug } = req.params;
  selectTechBySlug(slug)
    .then((tech) => {
      res.status(200).send({ tech });
    })
    .catch(next);
};
