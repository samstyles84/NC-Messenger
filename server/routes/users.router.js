const usersRouter = require("express").Router();

const { sendUsers } = require("../controllers/users.controllers");

usersRouter.route("/").get(sendUsers);
usersRouter.route("/:user_id").get(sendUsers);

module.exports = usersRouter;
