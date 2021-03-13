const express = require("express");
const bodyParser = require("body-parser");
const homeController = require("../controllers/HomeController.js");
const homeRouter = express.Router();

const urlencodedParser = bodyParser.urlencoded({extended: false});

//Routes

//GET
homeRouter.get("/about", homeController.about);
homeRouter.get("/", homeController.index);
homeRouter.get("/index", homeController.index);
homeRouter.get("/signin", homeController.signin);
homeRouter.get("/signup", homeController.signup);
homeRouter.get("/signout", homeController.signout);

homeRouter.get("/me", homeController.profile);

//POST
homeRouter.post("/signin", urlencodedParser, homeController.signinProcess);
homeRouter.post("/signup", urlencodedParser, homeController.signupProcess);
 
module.exports = homeRouter;