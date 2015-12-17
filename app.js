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
    // controllers
    mainCtrl = require('./routes/mainCtrl'),
    userCtrl = require('./routes/userCtrl'),
    departCtrl = require('./routes/departCtrl'),
    applyCtrl = require('./routes/applyCtrl'),
    noticeCtrl = require('./routes/noticeCtrl');


// 数据模型
global.dbConn = require('./models/dbConn');
global.db = mongoose.connect("mongodb://localhost:27017/EasyGo");


// ===================登陆校验===================
// session生命周期设置
app.use(session({ 
    secret: 'secret',
    cookie:{ 
        maxAge: 1000*60*30
    }
}));
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
// ==============================================


// 模版引擎
app.set('views', path.join(__dirname, 'views'));
app.engine("html",require("ejs").__express); 
// app.set("view engine","ejs");
app.set('view engine', 'html');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


// 静态资源路由，后期通过bower管理公共静态资源
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));


// ===================设置路由===================

// 登陆控制
app.use('/', mainCtrl);
app.use('/login',mainCtrl);
app.use('/register',mainCtrl);
app.use('/home',mainCtrl);
app.use('/logout',mainCtrl);

// 用户控制
app.use('/', userCtrl);
app.use('/user', userCtrl);
app.use('/user/new', userCtrl);
app.use('/user/:id', userCtrl);
app.use('/user/:id/edit', userCtrl);
app.use('/user/:id/delete', userCtrl);

// 部门控制
app.use('/', departCtrl);
app.use('/depart', departCtrl);
app.use('/depart/new', departCtrl);
app.use('/depart/:id', departCtrl);
app.use('/depart/:id/edit', departCtrl);
app.use('/depart/:id/delete', departCtrl);

// 申请控制
app.use('/', applyCtrl);
app.use('/apply', applyCtrl);
app.use('/apply/new', applyCtrl);
app.use('/apply/:id', applyCtrl);
app.use('/apply/:id/edit', applyCtrl);
app.use('/apply/:id/delete', applyCtrl);

// 通知控制
app.use('/', noticeCtrl);
app.use('/notice', noticeCtrl);
app.use('/notice/new', noticeCtrl);
app.use('/notice/:id', noticeCtrl);
app.use('/notice/:id/edit', noticeCtrl);
app.use('/notice/:id/delete', noticeCtrl);

// ==============================================


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// 通过通配符处理没有经过路由的所有404页面
app.get('*', function(req, res){
    res.render("login",{title:'1823619231'});
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
