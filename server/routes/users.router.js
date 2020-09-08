const usersRouter = require("express").Router();

const {
  sendUsers,
  addUser,
  updateUser,
} = require("../controllers/users.controllers");

usersRouter.route("/").get(sendUsers).post(addUser);
usersRouter.route("/:user_id").get(sendUsers).patch(updateUser);

//.delete(removeUser);

module.exports = usersRouter;
