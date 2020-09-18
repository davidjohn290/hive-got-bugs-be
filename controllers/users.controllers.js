const {
  selectMentors,
  selectUserByUsername,
} = require("../models/users.models");

exports.getMentors = (req, res, next) => {
  selectMentors()
    .then((mentors) => {
      res.status(200).send({ mentors });
    })
    .catch(next);
};

exports.getUser = (req, res, next) => {
  const { username } = req.params;
  selectUserByUsername(username)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};
