const { selectProblems } = require("../models/problemsModels");

exports.getProblems = (req, res) => {
  // const { tech, user, order, sort_by, } = req.query
  selectProblems().then((problems) => {
    res.status(200).send({ problems });
  });
};

// export.getProblemById = (req, res, next) => {
//     const { problem_id } = req.params;

//     selectProblemById(problem_id)
//         .then((getProblemById) => {
//             res.status(200).send({ problemById })
//         })
//         .catch((err) => {
//             next(err)
//         })

// }
