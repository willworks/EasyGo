var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session');
// PS：session与cookie是分开保存的.但是session中的数据经过加密处理后默认保存在一个cookie中.因此在使用session中间件之前必须使用cookieParser中间件

module.exports = function (app) {
    // ===================登陆校验===================
    // session生命周期设置
    app.use(session({ 
        secret: 'secret',
        cookie:{ 
            maxAge: 1000*60*30
        }
    }));
    // 拦截器,存储req.session数据用于返回给客户端，防止session请求时候新建实例丢失数据，所以注意要写在路由的前面
    app.use(function(req,res,next){ 
        // 这部步骤用于持续保证每次访问刷新本地跟服务端身份信息
        res.locals.user = req.session.user;
        var err = req.session.error;
        delete req.session.error;
        res.locals.message = "";
        if(err){ 
            // message可以直接在客户端获取
            res.locals.message = err;
        }
        next();
    });
    // ==============================================
    app.set('view engine', 'html');// 路由可以省去文件后缀名
    app.use(logger('dev')); // 在控制台中，显示req请求的信息
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());

    // 设置Angular入口静态路由
    app.use(express.static(path.join(root, 'app')));
    app.use(favicon(root + '/app/assets/favicon.ico'));
};
