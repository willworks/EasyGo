/// <reference path="../typings/node/node.d.ts"/>
/*
 * 在用户登录成功之后，系统会把用户信息写进req.session，而后期单用户实例每次req，都会传递req.session
 * 后期操作通过req.session来检测登陆状态，根据session内容返回对应用户请求数据
 * model通过global.dbConn全局方法（这个方法在app.js中已经实现)，来获取对象
 * 例如 var userModel = global.dbConn.getModel('user');
 */

/* 关于session更多知识
 session保存在称为sessionStore的数据仓库中。
 默认使用MemoryStore，就是所有session信息都保存在内存中。
 每来一个请求后，在路由分发前，首先使用cookieParser中间件将cookie中的sessionID解析出来，
 然后根据sessionID去sessionStore中进行查找，
 如果找到一份session后，就使用sessionStore中的数据构建一个新的session对象，
 把这个session对象放到req.session中，这就是session的由来。
 */

exports.index = function(req, res, next) {
    // 整个Angular的入口路由，服务端其他路由均为API路由，页面跳转控制路由在Angular内
    res.sendfile('./app/app.html');
};


exports.login = function(req, res, next) {
    var userModel = global.dbConn.getModel('user');  
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    userModel.findOne({name:uname},function(err, data){
        if(err){
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(!data){
            req.session.error = '用户名不存在';
            res.send({
                "code":"-1",
                "msg":"User not exist",
                "data":""
            });
        }else{
            if(upwd != data.password){
                req.session.error = "密码错误";
                res.send({
                    "code":"-2",
                    "msg":"Password incorrect",
                    "data":""
                });
            }else{
                req.session.user = data;
                res.send({
                    "code":"1",
                    "msg":"Login success",
                    "data":{
                        "uname":uname
                    }
                });
            }
        }
    });
};


exports.isLogin = function(req, res, next) {
    // 校验登陆状态
    res.send({
        "code":"1",
        "msg":"Is login in",
        "data":""
    });
};


exports.logout = function(req, res, next) {
    req.session.user = null;
    req.session.error = null;
    res.clearCookie('username');
    // 客户端根据返回结果进行跳转回登陆页面
    res.send({
        "code":"1",
        "msg":"Logout success",
        "data":""
    });
};

