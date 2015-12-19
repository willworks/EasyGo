var express = require('express');
var router = express.Router();

router.route('/depart').get(function(req,res){
    if (!req.session.user) {
        req.session.error = "请先登录";
        res.redirect("/login");
    } else {
        // 罗列全部内容操作
    }
});


router.route("/depart/new").post(function(req,res){ 
    var depart = global.dbConn.getModel('depart');
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    depart.findOne({name: uname},function(err,data){
        if(err){ 
            res.send(500);
            req.session.error =  '网络异常错误！';
            console.log(err);
        }else if(data){ 
            req.session.error = '用户名已存在！';
            res.send(500);
        }else{ 
            depart.create({ 
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


router.route("/depart/:id").get(function(req,res){ 
    if (!req.session.user) {
        req.session.error = "请先登录";
        res.redirect("/login");
    } else {
        // 读取具体内容操作
        var Depart = global.dbConn.getModel('depart');
        var did = req.body.id;
        depart.findOne({id: id},function(err,data){
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

router.route("/depart/:id/edit").post(function(req,res){ 
    if (!req.session.user) {
        req.session.error = "请先登录";
        res.redirect("/login");
    } else {
        // 编辑具体内容操作
        var Depart = global.dbConn.getModel('depart');
        var did = req.body.id;
        depart.findOne({id: id},function(err,data){
            if(err){ 
                res.send(500);
                req.session.error =  '网络异常错误！';
                console.log(err);
            }else if(data){ 
                req.session.error = '用户名已存在！';
                res.send(500);
            }else{ 
                depart.create({ 
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

router.get("/depart/:id/delete",function(req,res){
    if (!req.session.user) {
        req.session.error = "请先登录";
        res.redirect("/login");
    } else {
        // 删除操作
    }
});


module.exports = router;
