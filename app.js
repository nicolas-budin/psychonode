var createError = require('http-errors');
var express = require('express');
var favicon = require('serve-favicon')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var bcrypt  = require('bcrypt');

const {uuid} = require('uuidv4')
const session = require('express-session')

const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

var loginRouter = require('./routes/login');
var usersRouter = require('./routes/users');
var testDefinitionRouter = require('./routes/testDefinition');
var testsRouter = require('./routes/tests');
var exportRouter = require('./routes/export');

var {findUserById, findUserByLogin} = require('./services/UserService');
var {getUITextElementsMap} = require('./services/LanguageService');

var app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// add & configure middleware
app.use(session({
  genid: (req) => {

    // use UUIDs for session IDs
    return uuid()
  },
  secret: 'the dude abides for all your sins',
  resave: false,
  saveUninitialized: true
}))


// configure passport.js to use the local strategy
passport.use('local', new LocalStrategy(
    { usernameField: 'login', passwordField: 'password'},
    (login, password, done) => {

        findUserByLogin(login).then(user => {
            if (!user || !user.is_active) {
                return done(null, false, { message: 'Invalid credentials.\n' });
            }
            if (! bcrypt.compareSync(password, user.password)) {
                return done(null, false, { message: 'Invalid credentials.\n' });
            }
            return done(null, user);

        }).catch(error => done(error));
    }
));


// tell passport how to serialize the user
passport.serializeUser((user, done) => {
    done(null, user.login);
});

passport.deserializeUser((login, done) => {

    console.log(`The user id passport saved in the session file store is: ${login}`)

    findUserByLogin(login).then(user => {

        getUITextElementsMap(user.language).then(uITextElementsMap => {
            user.uITextElementsMap = uITextElementsMap;
            done(null, user);

        }).catch(error => done(error))
    }).catch(error => done(error));
});

app.use(passport.initialize());
app.use(passport.session());


app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/test_definition', testDefinitionRouter);
app.use('/tests', testsRouter);
app.use('/export', exportRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
