const { fetchUsers } = require("../models/users.models");

const sendUsers = (req, res, next) => {
  const { user_id } = req.params;
  fetchUsers(user_id)
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { sendUsers };
