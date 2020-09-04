var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors  = require("cors");
var logger = require('morgan');
var session = require('express-session');
const {mysqlconfig} = require('../ignore/config.js');
var mysql = require('mysql')



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
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+ '/../client/build/index.html'))
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname + '/../manager/build/')));
app.use(express.static(path.join(__dirname + '/../client/build/')));
app.use(session({
  secret: 'asdjgijfvnie12ASD_$%%!@',
  resave: true,
  saveUninitialized: true,
  cookie:{secure:false, maxAge:(4 * 60 * 60 * 1000)}, //4hours
}))

var passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done){
    var connection = mysql.createConnection(mysqlconfig)
    connection.connect();
    connection.query(`SELECT * FROM asahi.users WHERE userid= '${username}'`, function (error, results) {
      console.log('query')
      console.log(results)
      if(results[0] == undefined){ return done(null, false, {message: 'Incorrect username.'})}
      if(username != results[0].userid){
          console.log(1)
          return done(null, false, {message: 'Incorrect username.'})
      }else if(username == results[0].userid && password != results[0].password){
        console.log(2)
        return done(null, false, {message: 'Incorrect password.'})
      }else{
        console.log(JSON.parse(JSON.stringify(results[0])))
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
  console.log('deserializeUser', id)
  var connection = mysql.createConnection(mysqlconfig)
  connection.connect();
  console.log('connection connect2')
  connection.query(`SELECT * FROM asahi.users WHERE id= '${id}'`, function (error, results) {
       console.log('query')
       if(error){console.log(`query error = ${eror}`)}
       return done(null, JSON.parse(JSON.stringify(results[0])))
  });
  connection.end();
  console.log('connection end')
})


app.use('/admin', adminRouter);
app.use('/client', clientRouter);
app.use('/admin/users', usersRouter);

app.get('/admin/*', (req, res) => {
  console.log('requested2')
  console.log('requested', new Date())
  console.log('Check User is authenticated with this', req.user)
  if(req.user == undefined){
    res.redirect('/admin')
  }
  res.sendFile(path.join(__dirname+ '/../manager/build/index.html'))
});

app.get('/*', (req, res) => {
  console.log('requested')
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
