/*
 * 通过req.session来检测登陆状态
 * model通过global.dbConn全局方法（这个方法在app.js中已经实现)，来获取对象
 * 例如 var userModel = global.dbConn.getModel('user');
 */

exports.index = function(req, res, next) {
    console.log(req.session);
    if (!req.session.user) {
        req.session.error = "请先登录";
        // res.redirect("/login");
    } else {
        // res.sendfile('main.html');
    }
};


exports.login = function(req, res, next) {
    var userModel = global.dbConn.getModel('user');  
    var uname = req.body.uname;
    userModel.findOne({name:uname},function(err, data){
        if(err){
            res.send(500);
            console.log(err);
        }else if(!data){
            req.session.error = '用户名不存在';
            res.send('用户名不存在');
            // res.redirect("/login");
        }else{
            if(req.body.upwd != data.password){
                req.session.error = "密码错误";
                res.send("密码错误");
                // res.redirect("/login");
            }else{
                req.session.user = data;
                res.send('用户存在');
                // res.redirect('/');
            }
        }
    });

};

exports.logout = function(req, res, next) {
    req.session.user = null;
    req.session.error = null;
    // res.redirect("/login");
};