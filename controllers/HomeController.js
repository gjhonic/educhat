const User = require("../models/userScheme");

//Actions

//Main Pages
exports.index = function (request, response) {
    response.render("index.hbs", {
        title: "Главная"
    });
};

//About Pages
exports.about = function (request, response) {
    response.render("about.hbs", {
        title: "О нас"
    });
};

//Signin Form Page
exports.signin = function (request, response) {
    response.render("signin.hbs", {
        title: "Вход"
    });
};

//Signip Form Page
exports.signup = function (request, response) {

    response.render("signup.hbs", {
        title: "Регистрация"
    });
};

//POST Process
exports.signupProcess = function (request, response) {
    
    //Проверка что поля не пустые
    if(!validate_isempty(request)){
        //request.session.flash = ["warning", "Заполните все поля!"];
        //request.session.flash_note = "Заполните все поля!";
        //response.redirect("signup");
        return response.send("Поля не заполнены!");
    }
    
    //Проверка на совпадение паролей
    if(request.body.password != request.body.confirmpassword){
        //response.redirect("signup");
        return response.send("Пароли не совпадают");
    }

    isExitUsername = null;
    User.findOne({username: request.body.username}, function(err, doc){
        if(err) return console.log(err);
        isExitUsername = doc;
    });
    //console.log(isExitUsername);
    if(isExitUsername!=null){
        console.log(isExitUsername);
        console.log("Такой пользователь есть");
    }else{
        console.log(isExitUsername);
        console.log("Свободно");
    }


    // User.create({name: request.body.name, surname: request.body.surname, gender: request.body.gender, username: request.body.username, password: request.body.password}, function(err, doc){
    //     if(err) return console.log(err);
        
    //     console.log("Сохранен объект user", doc);
    //     response.redirect("signin");
    // });
};

//POST Process
exports.help = async function (request, response) {
    const Users = await User.find();
    console.log(Users);
    response.send(Users);
};

//POST Process
exports.signinProcess = function (request, response) {
    // mongoClient.connect(function(err, client){
          
    //     const db = client.db("test");
    //     const collection = db.collection("users");
     
    //     if(err) return console.log(err);
          
    //     collection.find().toArray(function(err, results){
    //         console.log(results);
    //         client.close();
    //     });
    // });
};


//Function validate empty
function validate_isempty(request){
    let posts_data = request.body;
    for (key in posts_data) {
        if(posts_data[key].trim() == '')
            return false; 
    }
    return true;
}