var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session');
// PS：session与cookie是分开保存的.但是session中的数据经过加密处理后默认保存在一个cookie中.因此在使用session中间件之前必须使用cookieParser中间件

module.exports = function (app) {
    /*
     * 将静态文件的请求放置在拦截器前边，用户在载入静态资源(Angular客户端)不受真正路由的校验的影响
     */
    // 设置Angular入口静态路由
    app.use(express.static(path.join(root, 'app')));
    app.use(favicon(root + '/app/assets/favicon.ico'));

    // =========================登陆校验=========================
    // session生命周期设置
    app.use(session({ 
        secret: 'secret',
        cookie:{ 
            maxAge: 1000*60*30 // 毫秒
        }
    }));
    // PS:所有请求会先经过中间件app.use处理，再传到路由app.http-verb等，next()用于确保请求进入下个路由
    /*
     * 登录拦截器，在请求未流向路由前先进行判断
     */
    app.use(function (req, res, next) {
        if (req.originalUrl != "/login" && !req.session.user) {
            return res.send('请先登录！');
        }
        next();
    });

    // 存储req.session到res.locals，模板引擎可以直接获取res.locals的数据进行渲染
    app.use(function (req, res, next) { 
        // 这部步骤用于持续保证每次访问刷新本地跟服务端身份信息
        res.locals.user = req.session.user;
        var err = req.session.error;
        delete req.session.error;
        res.locals.message = "";
        if(err){ 
            res.locals.message = err;
        }
        next();
    });
    // ==========================================================
    
    app.set('view engine', 'html');// 路由可以省去文件后缀名
    app.use(logger('dev')); // 在控制台中，显示req请求的信息
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
};
