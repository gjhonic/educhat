const express = require("express");
const bodyParser = require("body-parser");
const apiController = require("../controllers/ApiController.js");
const apiRouter = express.Router();

const urlencodedParser = bodyParser.urlencoded({extended: false});

//Routes

//GET
apiRouter.get("/users", apiController.getUsers);
apiRouter.get("/messages", apiController.getMessages);

//POST
apiRouter.post("/user", urlencodedParser, apiController.addUser);
 
module.exports = apiRouter;