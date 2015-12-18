var express = require('express');
var router = express.Router();

router.route('/user').get(function(req,res){
    if (!req.session.user) {
        req.session.error = "请先登录";
        res.redirect("/login");
    } else {
        // 罗列全部内容操作
    }
});


router.route("/user/new").post(function(req,res){ 
    var User = global.dbConn.getModel('user');
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    User.findOne({name: uname},function(err,data){
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


router.route("/user/:id").get(function(req,res){ 
    if (!req.session.user) {
        req.session.error = "请先登录";
        res.redirect("/login");
    } else {
        // 读取具体内容操作
        var user = global.dbConn.getModel('user');
        var did = req.body.id;
        User.findOne({id: id},function(err,data){
            if(err){ 
                res.send(500);
                req.session.error =  '网络异常错误！';
                console.log(err);
            }else if(data){ 
                res.render('index', data);
                res.send(200);
            }else{ 
                req.session.error = '用户不存在！';
                res.send(200);
            }
        });
    }
});

router.route("/user/:id/edit").post(function(req,res){ 
    if (!req.session.user) {
        req.session.error = "请先登录";
        res.redirect("/login");
    } else {
        // 编辑具体内容操作
        var user = global.dbConn.getModel('user');
        var did = req.body.id;
        User.findOne({id: id},function(err,data){
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
    }
});

router.get("/user/:id/delete",function(req,res){
    if (!req.session.user) {
        req.session.error = "请先登录";
        res.redirect("/login");
    } else {
        // 删除操作
    }
});

module.exports = router;
