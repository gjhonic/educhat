const express = require("express");
const homeController = require("../controllers/HomeController.js");
const homeRouter = express.Router();

//Routes
homeRouter.get("/about", homeController.about);
homeRouter.get("/", homeController.index);
homeRouter.get("/index", homeController.index);
homeRouter.get("/signin", homeController.signin);
homeRouter.get("/signup", homeController.signup);
 
module.exports = homeRouter;