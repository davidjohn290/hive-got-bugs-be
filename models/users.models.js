const knex = require("../db/connection");

exports.selectMentors = () => {
  return knex
    .select("*")
    .from("users")
    .where("role", "mentor")
    .then((mentors) => {
      if (mentors.length === 0) {
        return Promise.reject({ status: 400, msg: "Invalid Endpoint!" });
      } else return mentors;
    });
};

exports.selectUserByUsername = (username) => {
  return knex
    .select("*")
    .from("users")
    .where("username", username)
    .then((user) => {
      if (user.length === 0)
        return Promise.reject({ status: 400, msg: "Username does not exist" });
      else return user[0];
    });
};

exports.addNewUser = ({
  username,
  name,
  avatar_url,
  online_status,
  bug_points,
  bug_points_over_month,
  role,
}) => {
  return knex("users")
    .insert({
      username: username,
      name: name,
      avatar_url: avatar_url,
      online_status: online_status,
      bug_points: bug_points,
      bug_points_over_month: bug_points_over_month,
      role: role,
    })
    .returning("*")
    .then((newUser) => {
      if (newUser.role === "user") {
        delete newUser.description;
        delete newUser.github_url;
        delete newUser.skills1;
        delete newUser.skills2;
        delete newUser.skills3;
        delete newUser.skills4;
        return newUser;
      } else return newUser;
    });
};

exports.updateUserByUsername = (propertyUpdating, username) => {
  return knex("users")
    .where("username", username)
    .modify((query) => {
      const userProperty = Object.keys(propertyUpdating)[0];
      const newValue = propertyUpdating[userProperty];
      if (propertyUpdating.role === "mentor") {
        query.update({
          description: propertyUpdating.description,
          github_url: propertyUpdating.github_url,
          skills1: propertyUpdating.skills1,
          skills2: propertyUpdating.skills2,
          skills3: propertyUpdating.skills3,
        });
      }
      if (
        userProperty === "bug_points" ||
        userProperty === "bug_points_over_month"
      ) {
        query.increment(userProperty, newValue);
      } else if (Object.keys(propertyUpdating).length === 1) {
        query.update({
          [userProperty]: newValue,
        });
      }
    })
    .returning("*")
    .then((updatedUser) => {
      return updatedUser[0];
    });
};
