// 所有请求会先经过中间件app.use处理，再传到路由app.http-verb等，next()用于确保请求进入下个路由

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
    app.use(cookieParser()); // 对象化req.cookies传过来的cookie

    // =========================登陆校验=========================
    // session生命周期设置
    app.use(session({ 
        secret: 'secret',
        cookie:{ 
            maxAge: 1000*60*60 // 毫秒
        }
    }));


    // 登录拦截器，在请求未流向路由前先进行判断
    /*
    登陆测试代码
    var xmlhttp = new XMLHttpRequest();
    var user = 'uname=123&upwd=123';
    xmlhttp.open('POST','http://localhost:3000/api/v1.0/login',true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send(user);
     */
    app.use(function (req, res, next) {
        // console.log(req.originalUrl.split('/'));
        // 登入登出以及angular app入口不采取登陆拦截，直接指向路由
        if (req.originalUrl != "/" && req.originalUrl != "/api/v1.0/login" && req.originalUrl != "/api/v1.0/logout") {
            // api接口强制使用验证，其余流过到模糊匹配进行错误处理
            if (req.originalUrl.split('/')[1] == "api" && !req.session.user){
                // 客户端根据返回的code，对于未登录采取重定向处理
                return res.send({
                    "code":"-99",
                    "msg":"Not logged in",
                    "data":""
                });
                // PS：客户端跳转逻辑，每次打开一个页面，view必须先请求，至于请求的时候，根据code进行跳转，服务端不做任何操作处分cookie为用户名
            }
        }
        next();
    });


    // 在cookie插入登陆标记
    app.use(function (req, res, next) { 
        // 这部步骤用于持续保证每次访问刷新本地跟服务端身份信息
        if (req.session.user) {
            // console.log(req.session.user.name);
            res.cookie('username', req.session.user.name);
        }
        next();
    });
    // ==========================================================

    app.use(logger('dev')); // 在控制台中，显示req请求的信息
    app.use(bodyParser.json()); // 处理http body内容
    app.use(bodyParser.urlencoded({ extended: true }));

    /*
    // =======================待以后使用=========================
    // 存储req.session到res.locals，模板引擎可以直接获取res.locals的数据进行渲染，由于不使用后端渲染，故此处注释
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
    */

    // 存储req.session到res.cookie，可以在客户端通过读取cookie的方法获取部分用户信息
    /* 附加获取方法
    var allcookies = document.cookie;    
    function getCookie(cookie_name) {  
        var allcookies = document.cookie;  
        var cookie_pos = allcookies.indexOf(cookie_name);   //索引的长度  
        // 如果找到了索引，就代表cookie存在，反之，就说明不存在。  
        if (cookie_pos != -1) {
            // 把cookie_pos放在值的开始，只要给值加1即可。  
            cookie_pos += cookie_name.length + 1;
            var cookie_end = allcookies.indexOf(";", cookie_pos);      
            if (cookie_end == -1) {  
                cookie_end = allcookies.length;  
            }  
            var value = unescape(allcookies.substring(cookie_pos, cookie_end));
        }  
        return value;  
    }  
    console.log(getCookie("username"));

    // ==========================================================
    */
};