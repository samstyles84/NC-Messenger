const apiRouter = require("express").Router();
const usersRouter = require("./users.router");

const sendAPIs = require("../controllers/apis.controllers");

apiRouter.use("/users", usersRouter);

apiRouter.route("/").get(sendAPIs);
//.all(handle405s);

module.exports = apiRouter;
