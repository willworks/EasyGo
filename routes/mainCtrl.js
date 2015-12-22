/*
 * 通过req.session来检测登陆状态
 * model通过global.dbConn全局方法（这个方法在app.js中已经实现)，来获取对象
 * 例如 var userModel = global.dbConn.getModel('user');
 */

exports.index = function(req, res, next) {
    console.log(req.session);
    if (!req.session.user) {
        req.session.error = "请先登录";
        // 接口返回对象 res.send();
    } else {
        // 接口返回对象 res.send();
    }
};


exports.login = function(req, res, next) {
    var userModel = global.dbConn.getModel('user');  
    var uname = req.body.uname;
    userModel.findOne({name:uname},function(err, data){
        if(err){
            // 接口返回对象 res.send();
            console.log(err);
        }else if(!data){
            req.session.error = '用户名不存在';
            // 接口返回对象 res.send();
        }else{
            if(req.body.upwd != data.password){
                req.session.error = "密码错误";
                // 接口返回对象 res.send();
            }else{
                req.session.user = data;
                // 接口返回对象 res.send();
            }
        }
    });

};

exports.logout = function(req, res, next) {
    req.session.user = null;
    req.session.error = null;
    // 接口返回对象 res.send();
};