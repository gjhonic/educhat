const express = require("express");
const bodyParser = require("body-parser");
const homeController = require("../controllers/HomeController.js");
const homeRouter = express.Router();

const urlencodedParser = bodyParser.urlencoded({extended: false});

//Routes

//GET
homeRouter.get("/", homeController.index);
homeRouter.get("/index", homeController.index);
homeRouter.get("/signin", homeController.signin);
homeRouter.get("/signup", homeController.signup);
homeRouter.get("/signout", homeController.signout);

homeRouter.get("/me", homeController.profile);
homeRouter.get("/settings", homeController.settings);
homeRouter.get("/message", homeController.message);

//POST
homeRouter.post("/signin", urlencodedParser, homeController.signinProcess);
homeRouter.post("/signup", urlencodedParser, homeController.signupProcess);
homeRouter.post("/settings", urlencodedParser, homeController.settingsProcess);

homeRouter.post("/message", urlencodedParser, homeController.messageProcess);
 
module.exports = homeRouter;