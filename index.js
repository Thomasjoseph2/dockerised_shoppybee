var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars')
const handlebarsHelpers = require('handlebars-helpers');
var db=require('./model/connection')
var session=require('express-session')
var mongodb=require('mongodb')
// const bcrypt = require('bcrypt');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: "layout", layoutsDir: __dirname + '/views/layout/', partialsDir: __dirname + '/views/partials/',helpers: handlebarsHelpers()}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(session({
  secret: "mysecreatkey",
  resave: false,
  saveUninitialized: true, 
  cookie: { maxAge: 600000 }
}))

db.connect((err)=>{
    if(err)   
    console.log('err'+err);
    else
    console.log("database");
})
app.use('/', usersRouter);
app.use('/admin', adminRouter);
app.get("/health", (req, res) => {
  res.status(200).json({ status: "success", message: "Health check passed" });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(4000)


module.exports = app;
