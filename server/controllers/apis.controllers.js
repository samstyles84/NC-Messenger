const { getAPIJSON } = require("../models/apis.models");

const sendAPIs = (req, res, next) => {
  console.log("in controller");
  getAPIJSON((err, apiObj) => {
    console.log(apiObj);
    if (err) next(err);
    const parsedObj = JSON.parse(apiObj);
    console.log(parsedObj);
    res.status(200).send(parsedObj);
  });
};

module.exports = sendAPIs;
