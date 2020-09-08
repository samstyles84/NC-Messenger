const { usersData } = require("../data/index.js");

exports.seed = function (knex) {
  console.log("seeding");
  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      return knex("users").insert(usersData).returning("*");
    });
};
