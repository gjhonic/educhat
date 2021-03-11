const express = require("express");
const expressHbs = require("express-handlebars");
const hbs = require("hbs");
const app = express();
  
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
 
// - - - ROUTES - - - >

//Главная страница
app.get("/", function(request, response){
    response.render("index.hbs", {
        title: "Главная"
    });
});
//Страница Регистрации
app.get("/about", function(request, response){
    response.render("about.hbs", {
        title: "О нас"
    });
});


//Страница Аутентификации
app.get("/signin", function(request, response){
    response.render("signin.hbs", {
        title: "Вход"
    });
});


//Страница Регистрации
app.get("/signup", function(request, response){
    response.render("signup.hbs", {
        title: "Регистрация"
    });
});

// < - - - ROUTES - - - 

//Start Server
app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`)
})