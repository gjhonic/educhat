exports.index = function (request, response) {
    response.render("index.hbs", {
        title: "Главная"
    });
};
exports.about = function (request, response) {
    response.render("about.hbs", {
        title: "О нас"
    });
};

exports.signin = function (request, response) {
    response.render("signin.hbs", {
        title: "Вход"
    });
};

exports.signup = function (request, response) {
    response.render("signup.hbs", {
        title: "Регистрация"
    });
};
