const knex = require("../connection");

exports.fetchUsers = (user_id) => {
  return knex
    .select("*")
    .from("users")
    .modify((query) => {
      if (user_id) query.where("user_id", user_id);
    })
    .then((users) => {
      if (ingredients.length === 0) {
        return Promise.reject({ status: 404, msg: "user id not found" });
      } else {
        return { users };
      }
    });
};
