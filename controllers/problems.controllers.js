const {
    selectProblems,
    selectProblemById,
} = require("../models/problems.models");
const { selectTechBySlug } = require("../models/tech.models");

exports.getProblems = (req, res, next) => {
    const { sort_by, order, solved, difficulty, tech } = req.query;
    let checkDB;

    if (tech) {
        checkDB = selectTechBySlug(tech);
    } else checkDB = Promise.resolve();

    checkDB
        .then(() => {
            return selectProblems(sort_by, order, solved, difficulty, tech);
        })
        .then((problems) => {
            res.status(200).send({ problems });
        })
        .catch(next);
};

exports.getProblemById = (req, res, next) => {
    const { problem_id } = req.params;
    selectProblemById(problem_id)
        .then((problemById) => {
            res.status(200).send({ problemById });
        })
        .catch((err) => {
            next(err);
        });
};