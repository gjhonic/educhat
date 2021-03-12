const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MongoClient = require("mongodb").MongoClient;
const dburl = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(dburl, { useUnifiedTopology: true });

  
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
    
    if(!validate_isempty(request)){
        //request.session.flash = ["warning", "Заполните все поля!"];
        //request.session.flash_note = "Заполните все поля!";
        response.redirect("signup");
    }

    //Модель пользователя
    const userScheme = new Schema({
        name: {
            type: String,
            required: true,
            minlength:2,
            maxlength:20
        },
        surname: {
            type: String,
            required: true,
            minlength:2,
            maxlength:30
        },
        gender: {
            type: String,
            required: true,
            enum: ['male', 'female'],
        },
        username: {
            type: String,
            required: true,
            minlength:5,
            maxlength:30
        },
        password: {
            type: String,
            required: true,
        },
    });
    
    mongoClient.connect(function(err, client){
          
        const db = client.db("test");
        const collection = db.collection("users");
         
        collection.insertOne(user, function(err, results){
                  
            console.log(results);
            client.close();
        });
    });

};

//POST Process
exports.signinProcess = function (request, response) {
    mongoClient.connect(function(err, client){
          
        const db = client.db("test");
        const collection = db.collection("users");
     
        if(err) return console.log(err);
          
        collection.find().toArray(function(err, results){
            console.log(results);
            client.close();
        });
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