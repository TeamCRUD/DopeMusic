var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require("express-session")
var session_middleware = require("./middlewares/session")
var methodOverride = require("method-override")

// Controllers routes
var index = require('./routes/index');
var signup = require('./routes/signup');
var login = require('./routes/login');
var logout = require('./routes/logout');
var create = require('./routes/upload');
var album = require('./routes/album');
var collection = require('./routes/collection');
var user = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"))
app.use(express.static(path.join(__dirname, 'public')));
app.use("/avatars", express.static(path.join(__dirname, 'avatars')));
app.use("/songs", express.static(path.join(__dirname, 'songs')));
app.use("/covers", express.static(path.join(__dirname, 'covers')));
app.use("/jquery", express.static(path.join(__dirname, 'node_modules', 'jquery','dist')));
app.use(session({
  secret: "D*m*1*7",
  resave: false,
  saveUninitialized: false
}))

// routes
app.use(['/*'], session_middleware.allAccess);
app.use('/', index);
app.use('/signup', signup);
app.use('/login', login);
app.use('/logout', logout);
app.use('/album', album);
app.use(['/*'], session_middleware.session);
app.use('/upload', create);
app.use('/collection', collection);
app.use('/user', user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
