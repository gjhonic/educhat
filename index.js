const express = require("express");
const expressHbs = require("express-handlebars");
const hbs = require("hbs");
const app = express();
const session = require('express-session')

//Routers
//const userRouter = require("./routes/UserRouter.js");
const homeRouter = require("./routes/HomeRouter.js");
 

//CONFIG
const host = '127.0.0.1';
const port = 3002;

// устанавливаем настройки для файлов layout
app.engine("hbs", expressHbs(
    {
        layoutsDir: "views/layouts", 
        defaultLayout: "default",
        extname: "hbs"
    }
))
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
app.use(
    session({
      secret: 'you secret key',
      saveUninitialized: true,
    })
  )

//Routes
app.use("/", homeRouter);
 

app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});


//Start Server
app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`)
})