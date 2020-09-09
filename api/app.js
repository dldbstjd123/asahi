var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors  = require("cors");
var logger = require('morgan');
var session = require('express-session');
const {mysqlconfig} = require('../ignore/config.js');
var mysql = require('mysql')
var bodyParser = require('body-parser')


var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var clientRouter = require('./routes/client');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser('asdjgijfvnie12ASD_$%%!@'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+ '/../client/build/index.html'))
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname + '/../manager/build/')));
app.use(express.static(path.join(__dirname + '/../client/build/')));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(session({
  secret: 'asdjgijfvnie12ASD_$%%!@',
  resave: false,
  saveUninitialized: false,
  cookie:{secure:false, maxAge:(4 * 60 * 60 * 1000)}, //4hours
}))
app.use(bodyParser.urlencoded({extended:false}))

var passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done){
    var connection = mysql.createConnection(mysqlconfig)
    connection.connect();
    connection.query(`SELECT * FROM asahi.users WHERE userid= '${username}'`, function (error, results) {
      if(results[0] == undefined){ return done(null, false, {message: 'Incorrect username.'})}
      if(username != results[0].userid){
          return done(null, false, {message: 'Incorrect username.'})
      }else if(username == results[0].userid && password != results[0].password){
        return done(null, false, {message: 'Incorrect password.'})
      }else{
        return done(null, JSON.parse(JSON.stringify(results[0])))
      }
    });
    connection.end();
    console.log('connection end')
  }
));

passport.serializeUser(function(user,done){
  done(null, user.id)
})

passport.deserializeUser(function(id, done){
  var connection = mysql.createConnection(mysqlconfig)
  connection.connect();
  connection.query(`SELECT * FROM asahi.users WHERE id= '${id}'`, function (error, results) {
       if(error){console.log(`query error = ${eror}`)}
       return done(null, JSON.parse(JSON.stringify(results[0])))
  });
  connection.end();
})


app.use('/admin', adminRouter);
app.use('/client', clientRouter);
app.use('/admin/users', usersRouter);

app.get('/admin/*', (req, res) => {
  if(req.user == undefined){
    res.redirect('/admin')
  }else{
     res.sendFile(path.join(__dirname+ '/../manager/build/index.html'))
  }
 });

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname+ '/../client/build/index.html'))
});
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
