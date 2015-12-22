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
    mainCtrl = require('./routes/mainCtrl');


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

/*
 // 模版引擎
 // ====技术栈为 Node + Angular，故后台只有提供api不负责渲染，渲染发生在前端angular====
 app.set('views', path.join(__dirname, 'views'));
 app.engine("html",require("ejs").__express); 
 app.set('view engine', 'html');
*/
app.use(logger('dev')); // 在控制台中，显示req请求的信息
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


// 静态资源路由，后期通过bower管理公共静态资源
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));


// ===================设置路由===================

// 登陆控制
app.get('/', mainCtrl.index);
app.post('/login', mainCtrl.login);
app.get('/logout', mainCtrl.logout);

// // 用户控制
// app.get('/user', userCtrl.index);
// app.post('/user/add', userCtrl.add);
// app.get('/user/:id', userCtrl.list);
// app.post('/user/:id/edit', userCtrl.edit);
// app.get('/user/:id/delete', userCtrl.delete);

// // 部门控制
// app.get('/depart', departCtrl.index);
// app.post('/depart/add', departCtrl.add);
// app.get('/depart/:id', departCtrl.list);
// app.post('/depart/:id/edit', departCtrl.edit);
// app.get('/depart/:id/delete', departCtrl.delete);

// // 申请控制
// app.get('/apply', applyCtrl.index);
// app.post('/apply/add', applyCtrl.add);
// app.get('/apply/:id', applyCtrl.list);
// app.post('/apply/:id/edit', applyCtrl.edit);
// app.get('/apply/:id/delete', applyCtrl.delete);

// // 通知控制
// app.get('/notice', noticeCtrl.index);
// app.post('/notice/add', noticeCtrl.add);
// app.get('/notice/:id', noticeCtrl.list);
// app.post('/notice/:id/edit', noticeCtrl.edit);
// app.get('/notice/:id/delete', noticeCtrl.delete);

// ==============================================


// 通过通配符处理没有经过路由的所有404页面
app.get('*', function(req, res){
    res.send('404');
});


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
