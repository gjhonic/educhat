
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
    console.log(request.body);
};

//POST Process
exports.signinProcess = function (request, response) {
    console.log(request.body);
};

