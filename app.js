/** 
    Document   : EasyGo
    Created on : 2015.10
    Author     : Kevin Zhong
    License    : MIT
    github     : https://github.com/willworks/EasyGo
    Description: EasyGo is a co-working-system for office approval
    Copyright (c) 2015 Kevin Zhong
*/
var express = require('express'),
    app = express(),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    routes = require('./routes/index'),
    users = require('./routes/users');


// 数据模型
global.dbHandel = require('./database/dbHandel');
global.db = mongoose.connect("mongodb://localhost:27017/nodedb");


// session生命周期设置
app.use(session({ 
  secret: 'secret',
  cookie:{ 
    maxAge: 1000*60*30
  }
}));


// 模版引擎
app.set('views', path.join(__dirname, 'views'));
app.engine("html",require("ejs").__express); 
//app.set("view engine","ejs");
app.set('view engine', 'html');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// session验证登陆
app.use(function(req,res,next){ 
  res.locals.user = req.session.user;
  var err = req.session.error;
  delete req.session.error;
  res.locals.message = "";
  if(err){ 
    res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+err+'</div>';
  }
  next();
});


// 设置路由
app.use('/', routes);
app.use('/users', users);
app.use('/login',routes);
app.use('/register',routes);
app.use('/home',routes);
app.use("/logout",routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
