const {
  selectMentors,
  selectUserByUsername,
  addNewUser,
  updateUserByUsername,
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

exports.postNewUser = (req, res, next) => {
  const { body } = req;
  addNewUser(body)
    .then((newUser) => {
      res.status(201).send({ newUser });
    })
    .catch(next);
};

exports.patchNewUser = (req, res, next) => {
  const { body } = req;
  const { username } = req.params;
  updateUserByUsername(body, username)
    .then((updatedUser) => {
      res.status(200).send({ updatedUser });
    })
    .catch(next);
};
