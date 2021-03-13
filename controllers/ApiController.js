const User = require("../models/userScheme");
const bcrypt = require('bcrypt');

//Actions
//GET PROCESS
exports.getUsers = function (request, response) {
    User.find({}, function(err, doc){
        if(err) return console.log(err);
        if(doc == ''){
            response.send("Нет пользователей");
        }else{
            response.send(doc);
        }
        
    });
};

//POST Process
exports.addUser = function (request, response) {

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
