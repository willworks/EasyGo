var express = require('express');
var router = express.Router();

/*
 * model通过global.dbConn全局方法（这个方法在app.js中已经实现)，来获取对象
 * 例如 var User = global.dbConn.getModel('user');
 */

router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' }); 
    res.end('123123');
});


router.route("/login").get(function(req, res){
    res.render("login",{title:'User Login'});
}).post(function(req,res){
    var User = global.dbConn.getModel('user');  
    var uname = req.body.uname;
    User.findOne({name:uname},function(err, data){
        if(err){
            res.send(500);
            console.log(err);
        }else if(!data){
            req.session.error = '用户名不存在';
            res.send(404);
            // res.redirect("/login");
        }else{
        	if(req.body.upwd != data.password){
                req.session.error = "密码错误";
                res.send(404);
                // res.redirect("/login");
        	}else{
                req.session.user = data;
                res.send(200);
                // res.redirect("/home");
        	}
        }
    });
});


router.route("/register").get(function(req, res){ 
    res.render("register",{title:'User register'});
}).post(function(req, res){ 
    var User = global.dbConn.getModel('user');
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    User.findOne({name: uname},function(err, data){
        if(err){ 
            res.send(500);
            req.session.error =  '网络异常错误！';
            console.log(err);
        }else if(data){ 
            req.session.error = '用户名已存在！';
            res.send(500);
        }else{ 
            User.create({ 
                name: uname,
                password: upwd
            },function(err,data){ 
                if (err) {
                    res.send(500);
                    console.log(err);
                } else {
                    req.session.error = '用户名创建成功！';
                    res.send(200);
                }
            });
        }
    });
});


router.get("/home",function(req, res){ 
    if(!req.session.user){
        req.session.error = "请先登录";
        res.redirect("/login");
    }
    res.render("home",{title:'Home'});
});


router.get("/logout",function(req, res){
    req.session.user = null;
    req.session.error = null;
    res.redirect("/");
});

module.exports = router;
