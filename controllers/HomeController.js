const User = require("../models/userScheme");
const bcrypt = require('bcrypt');
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

//Signip Form Page
exports.signout = function (request, response) {
    request.session.userId = null;
    response.redirect('/')
};

//My Profile Page
exports.profile = function (request, response) {
    User.findOne({_id: request.session.userId}, function(err, doc){
        if(err) return console.log(err);
        if(doc === null){
            response.send('Нет доступа');
        }else{
            User.find({}, function(err_find, results){
                //return response.send(results);
                if(err) return console.log(err);
                response.render("me.hbs", {
                    Allusers: results, 
                    user: {
                        name: doc.name,
                        surname: doc.surname
                    }
                });
                
            }); 
            
        }
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

    User.findOne({username: request.body.username}, function(err, doc){
        if(err) return console.log(err);
        if(doc === null){

            let salt = bcrypt.genSaltSync(10);
            let hashpassword = bcrypt.hashSync(request.body.password, salt)

            User.create({name: request.body.name, surname: request.body.surname, gender: request.body.gender, username: request.body.username, password: hashpassword}, function(err, doc){
                if(err) return response.send(err);
                
                response.send("Сохранен объект user: "+doc);
            });
        }
        else{
            response.send('Логин занят');
        }
    }); 
};


//POST Process
exports.signinProcess = function (request, response) {
    User.findOne({username: request.body.username}, function(err, doc){
        if(err) return console.log(err);

        if(doc === null){
            return response.send("Не верный логин или пароль 1");
        }else{
            bcrypt.compare(request.body.password, doc.password, function(err, res) {
                if (res) {
                    //Доступ есть!
                    request.session.userId = doc._id
                    response.redirect('/me')
                }else {
                    //Пароли не совпадают
                    return response.send("Не верный логин или пароль 2");
               }
            });
        }
    });    
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