const knex = require("../connection");

exports.fetchUsers = (user_id) => {
  return knex
    .select("*")
    .from("users")
    .modify((query) => {
      if (user_id) query.where("user_id", user_id);
    })
    .then((users) => {
      if (users.length === 0) {
        return Promise.reject({ status: 404, msg: "user id not found" });
      } else if (users.length === 1) {
        return users[0];
      } else {
        return users;
      }
    });
};

exports.postUser = (username, url) => {
  const userToAdd = {
    username: username,
    url: url,
  };

  return knex("users")
    .insert(userToAdd)
    .returning("*")
    .then((userToAdd) => {
      return userToAdd[0];
    });
};

exports.patchUser = (username, url, user_id) => {
  return knex("users")
    .where("user_id", user_id)
    .update(
      {
        username: username,
        url: url,
      },
      ["username", "url", "user_id"]
    )
    .then((userArray) => {
      if (userArray.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "user id not found",
        });
      }
      return userArray[0];
    });
};
