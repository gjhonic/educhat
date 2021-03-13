const User = require("../models/userScheme");
const bcrypt = require('bcrypt');
//Actions

//Main Pages
exports.index = function (request, response) {
    let set_layout = (request.session.userId !== undefined) ? "app" : "default";

    response.render("index.hbs", {
        title: "Главная",
        layout: set_layout,
        flash:  {
            message: request.flash('flash_message'),
            status: request.flash('flash_status')
        }
    });
};

//About Pages
exports.about = function (request, response) {
    let set_layout = (request.session.userId !== undefined) ? "app" : "default";
    response.render("about.hbs", {
        title: "О нас",
        layout: set_layout,
        flash:  {
            message: request.flash('flash_message'),
            status: request.flash('flash_status')
        }
    });
};

//Signin Form Page
exports.signin = function (request, response) {
    let set_layout = (request.session.userId !== undefined) ? "app" : "default";
    response.render("signin.hbs", {
        title: "Вход",
        layout: set_layout,
        flash:  {
            message: request.flash('flash_message'),
            status: request.flash('flash_status')
        }
    });
};

//Signip Form Page
exports.signup = function (request, response) {
    //response.send(request.flash('message'));

    let set_layout = (request.session.userId !== undefined) ? "app" : "default";
    response.render("signup.hbs", {
        title: "Регистрация",
        layout: set_layout,
        flash:  {
            message: request.flash('flash_message'),
            status: request.flash('flash_status')
        }
    });
};

//Signip Form Page
exports.signout = function (request, response) {
    request.session.userId = undefined;
    response.redirect('/')
};

//My Profile Page
exports.profile = function (request, response) {

    User.findOne({_id: request.session.userId}, function(err, doc){
        if(err) return console.log(err);
        if(doc === null){
            request.flash('flash_message', 'Пройдите аутентификацию');
            request.flash('flash_status', 'warning');
            return response.redirect("/signin");
        }else{
            User.find({}, function(err_find, results){
                //return response.send(results);
                if(err) return console.log(err);
                response.render("me.hbs", {
                    Allusers: results, 
                    user: {
                        name: doc.name,
                        surname: doc.surname
                    },
                    flash: {
                        message: request.flash('flash_message'),
                        status: request.flash('flash_status')
                    },
                    layout: 'app'
                });
                
            }); 
            
        }
    }); 
};

//POST Process
exports.signupProcess = function (request, response) {
    
    //Проверка что поля не пустые
    if(!validate_isempty(request)){
        request.flash('flash_message', 'Заполните все поля');
        request.flash('flash_status', 'warning');
        return response.redirect("/signup");
    }
    
    //Проверка на совпадение паролей
    if(request.body.password != request.body.confirmpassword){
        request.flash('flash_message', 'Пароли не совпадают');
        request.flash('flash_status', 'warning');
        return response.redirect("/signup");
    }

    User.findOne({username: request.body.username}, function(err, doc){
        if(err) return console.log(err);
        if(doc === null){

            let salt = bcrypt.genSaltSync(10);
            let hashpassword = bcrypt.hashSync(request.body.password, salt)

            User.create({name: request.body.name, surname: request.body.surname, gender: request.body.gender, username: request.body.username, password: hashpassword}, function(err, doc){
                if(err) return response.send(err);
                request.session.userId = doc._id;
                request.flash('flash_message', 'Добро пожаловать в личный кабинет');
                request.flash('flash_status', 'success');
                return response.redirect('/me');
            });
        }
        else{
            request.flash('flash_message', 'Пользователь с таким логином существует!');
            request.flash('flash_status', 'warning');
            return response.redirect("/signup");
        }
    }); 
};


//POST Process
exports.signinProcess = function (request, response) {
    User.findOne({username: request.body.username}, function(err, doc){
        if(err) return console.log(err);

        if(doc === null){
            request.flash('flash_message', 'Не верный логин пароль');
            request.flash('flash_status', 'warning');
            return response.redirect("/signin");
        }else{
            bcrypt.compare(request.body.password, doc.password, function(err, res) {
                if (res) {
                    //Доступ есть!
                    request.session.userId = doc._id
                    request.flash('flash_message', 'Добро пожаловать в личный кабинет');
                    request.flash('flash_status', 'success');;
                    return response.redirect('/me')
                }else {
                    request.flash('flash_message', 'Не верный логин пароль');
                    request.flash('flash_status', 'warning');
                    return response.redirect("/signin");
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