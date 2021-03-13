const User = require("../models/userScheme");

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

    // isExitUsername = null;
    // User.findOne({username: request.body.username}, function(err, doc){
    //     if(err) return console.log(err);
    //     isExitUsername = doc;
    // });
    // //console.log(isExitUsername);
    // if(isExitUsername!=null){
    //     console.log(isExitUsername);
    //     console.log("Такой пользователь есть");
    // }else{
    //     console.log(isExitUsername);
    //     console.log("Свободно");
    // }


    // User.create({name: request.body.name, surname: request.body.surname, gender: request.body.gender, username: request.body.username, password: request.body.password}, function(err, doc){
    //     if(err) return console.log(err);
        
    //     response.send("Сохранен объект user: "+doc);
    // });
};