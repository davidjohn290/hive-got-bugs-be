const knex = require("../db/connection");

exports.selectUsers = (role) => {
  return knex
    .select("*")
    .from("users")
    .where("role", role)
    .then((users) => {
      if (users.length === 0) {
        return Promise.reject({ status: 400, msg: "Bad request!" });
      } else return users;
    });
};

exports.selectUserByUsername = (username) => {
  return knex
    .select("*")
    .from("users")
    .where("username", username)
    .then((user) => {
      if (user.length === 0)
        return Promise.reject({ status: 404, msg: "User does not exist!" });
      else return user[0];
    });
};

exports.addNewUser = (body) => {
  return knex("users")
    .insert(body)
    .returning("*")
    .then((newUser) => {
      return newUser[0];
    });
};

exports.updateUserByUsername = (body, username) => {
  return knex
    .select("*")
    .from("users")
    .where("username", username)
    .modify((query) => {
      if (body.inc_bug_points !== undefined) {
        const { inc_bug_points, ...rest } = body;
        query.increment("bug_points", inc_bug_points);
        query.update(rest);
      } else query.update(body);
    })
    .returning("*")
    .then((updatedUser) => {
      if (updatedUser.length === 0) {
        return Promise.reject({ status: 404, msg: "User not found!" });
      } else return updatedUser[0];
    });
};
