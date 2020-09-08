const knex = require("../connection");

exports.fetchUsers = (user_id) => {
  return knex
    .select("*")
    .from("users")
    .returning("*")
    .modify((query) => {
      if (user_id) query.where("user_id", user_id);
    })
    .then((users) => {
      console.log(users, "response");
      if (users.length === 0) {
        return Promise.reject({ status: 404, msg: "user id not found" });
      } else if (users.length === 1) {
        return users[0];
      } else {
        return users;
      }
    });
};
