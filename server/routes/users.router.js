const usersRouter = require("express").Router();

const {
  sendUsers,
  addUser,
  updateUser,
  removeUser,
} = require("../controllers/users.controllers");

const { handle405s } = require("../errors");

usersRouter.route("/").get(sendUsers).post(addUser).all(handle405s);
usersRouter
  .route("/:user_id")
  .get(sendUsers)
  .patch(updateUser)
  .delete(removeUser)
  .all(handle405s);

module.exports = usersRouter;
