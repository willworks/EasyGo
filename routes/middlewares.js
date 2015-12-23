var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session');

module.exports = function (app) {
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
        // app.locals 是一个函数对象，程序内所有页面模板都能访问这个对象，可以用它保存全局配置变量供页面模板使用。
        res.locals.user = req.session.user;
        var err = req.session.error;
        delete req.session.error;
        res.locals.message = "";
        if(err){ 
            res.locals.message = err;
        }
        next();
    });
    // ==============================================

    app.use(logger('dev')); // 在控制台中，显示req请求的信息
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());

    // 静态资源路由，后期通过bower管理公共静态资源
    app.use(express.static(path.join(root, 'public')));
    app.use(favicon(root + '/public/favicon.ico'));
    app.use(express.static(path.join(root, 'bower_components')));
};
