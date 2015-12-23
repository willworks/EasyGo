exports.index = function(req, res, next) {
    if (!req.session.user) {
        req.session.error = "请先登录";
        // 接口返回对象 res.send();
    } else {
        // 接口返回对象 res.send();
    }
};


exports.add = function(req, res, next) {
    var applyModel = global.dbConn.getModel('user');  
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    applyModel.findOne({name: uname},function(err, data){
        if(err){ 
            // 接口返回对象 res.send();
            console.log(err);
        }else if(data){ 
            req.session.error = '申请已存在！';
            // 接口返回对象 res.send();
        }else{ 
            applyModel.create({ 
                name: uname,
                password: upwd
            },function(err,data){ 
                if (err) {
                    // 接口返回对象 res.send();
                    console.log(err);
                } else {
                    req.session.error = '申请创建成功！';
                    // 接口返回对象 res.send();
                }
            });
        }
    });
};


exports.list = function(req, res, next) {
    var applyModel = global.dbConn.getModel('user');  
    var uname = req.body.uname;
    applyModel.findOne({name:uname},function(err, data){
        if(err){
            // 接口返回对象 res.send();
            console.log(err);
        }else if(!data){
            req.session.error = '申请不存在';
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


exports.edit = function(req, res, next) {
    var applyModel = global.dbConn.getModel('user');  
    var uname = req.body.uname;
    applyModel.findOne({name:uname},function(err, data){
        if(err){
            // 接口返回对象 res.send();
            console.log(err);
        }else if(!data){
            req.session.error = '申请不存在';
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


exports.delete = function(req, res, next) {
    req.session.user = null;
    req.session.error = null;
    // 接口返回对象 res.send();
};