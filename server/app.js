const express = require("express");
const apiRouter = require("./routes/api.router");
const cors = require("cors");

//Error handling

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

//Error handling

module.exports = app;
