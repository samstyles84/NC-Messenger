const usersRouter = require("express").Router();

const { sendUsers } = require("../controllers/users.controllers");

usersRouter.route("/users/:user_id").get(sendUsers);

module.exports = usersRouter;
