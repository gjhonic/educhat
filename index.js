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
        defaultLayout: "main",
        extname: "hbs"
    }
))
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
 
app.use("/contact", function(request, response){
      
    response.render("contact", {
        title: "Мои контакты",
        email: "gavgav@mycorp.com",
        phone: "+1234567890"
    });
}); 
 
app.use("/", function(request, response){
    response.render("index.hbs", {
        title: "Главная"
    });
});

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`)
})