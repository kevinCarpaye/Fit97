const express          = require('express');
const bodyParser       = require('body-parser');
const path             = require('path');
const apiRouter        = require('./apiRouter').router;
const expressValidator = require('express-validator');
const cookieParser     = require('cookie-parser');
const flash            = require('connect-flash');

// Modules authentification
const session          = require('express-session');
const passport         = require('passport');
const MysqlStore       = require('express-mysql-session');

app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/JS'));

app.use(cookieParser());

var options = {
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'database_development_fit97',
    port: '8889'
  };

var sessionStore = new MysqlStore(options);

app.use(session({
    secret: 'iovjcxzoivjewqn',
    resave: true,
    store: sessionStore,
    saveUninitialized: true,
    //cookie: { secure: true }
}));

app.use(expressValidator());
app.use(flash());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
})

require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});

app.use(apiRouter);

//Route d'accueil
app.get('/', function(req, res) {
    res.render('index');
    //console.log(req.user);
    //console.log(req.session.passport);
})


app.listen(3000, () => {
    console.log('Server en écoute');
})