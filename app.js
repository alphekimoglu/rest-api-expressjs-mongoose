var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");

//MongoDb connection with mongoose
var MONGODB_URL = process.env.MONGODB_URL //Add MongoDb URI as env variable before start
mongoose.connect(MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology:true});
mongoose.set('debug', true);

//Routing modules
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var recordsRouter = require('./routes/records');

var app = express();
//App default port, better to use as env variable or development config value for further improvemnts
var port = 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/records', recordsRouter);

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

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
module.exports = app;
