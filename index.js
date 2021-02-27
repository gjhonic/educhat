let express    = require('express');
let bodyParser = require('body-parser');
let path = require("path");

let app = express();
app.use(express.static(path.join(__dirname, 'src')));

let urlencodedParser = bodyParser.urlencoded({ extended: false });


app.set('view engine', 'ejs');
app.set('layout', 'views/layouts');
app.use('/public',express.static('public'));



//Главная страница >>>
app.get('/index', function (req, res) {
  res.render('index');
});
app.get('/', function (req, res) {
  res.render('index');
});
//<<<

app.listen(3002);
console.log("Server Active ...");