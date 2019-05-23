var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// TODO: set up AUTHENTICATION
var session = require("express-session");

// load the .env vars
require('dotenv').config();

// create the Express app
var app = express();

// TODO: connect to the MongoDB with mongoose; Daniel will go
// over how to use MongoDB Atlas

// TODO: configure passport for OUR app


// require our routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// TODO: need to mount session and passport middleware
// must be done BELOW cookieParser
app.use(session({
  secret: "I love cookies!",
  resave: false,
  saveUninitialized: true
}));

// mount all routes with appropriate base paths
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
