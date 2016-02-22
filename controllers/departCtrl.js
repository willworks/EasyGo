/*
var xmlhttp = new XMLHttpRequest();
var depart = "title=222&content=222&recipient_id=['5672592b4c970f202517dedb','56714c62725ef0741119966e']";
xmlhttp.open('POST','http://localhost:3000/api/v1.0/depart/add',true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send(depart);
 */

exports.index = function(req, res, next) {
    var departModel = global.dbConn.getModel('depart');  
    var recipient_id = req.session.user._id;

    departModel.find({recipient_id: recipient_id},function(err, data){
        if(err){ 
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        } else { 
            res.send({
                "code":"1",
                "msg":"success",
                "data":data
            });
        }
    });
};


exports.add = function(req, res, next) {

    var departModel = global.dbConn.getModel('depart'); 
    var name = req.body.name;
    var leader_id = req.body.leader_id;
    var depart_upper_id = req.body.depart_upper_id;
    var delete_flag = 'false';
    departModel.findOne({name: name},function(err, data){
        if(err){ 
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(data){ 
            req.session.error = '部门已存在';
            res.send({
                "code":"2",
                "msg":"exist",
                "data":""
            });
        }else{ 
            departModel.create({ 
                'name' : name,
                'leader_id' : leader_id,
                'depart_upper_id' : depart_upper_id,
                'delete_flag' : delete_flag
            },function(err,data){ 
                if (err) {
                    // 接口返回对象 res.send();
                    res.send({
                        "code":"0",
                        "msg":err,
                        "data":""
                    });
                    console.log(err);
                } else {
                    res.send({
                        "code":"1",
                        "msg":"success",
                        "data":data
                    });
                }
            });
        }
    });
};


exports.list = function(req, res, next) {
    var departModel = global.dbConn.getModel('user');  
    var uname = req.body.uname;
    departModel.findOne({name:uname},function(err, data){
        if(err){
            // 接口返回对象 res.send();
            console.log(err);
        }else if(!data){
            req.session.error = '部门不存在';
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
    var departModel = global.dbConn.getModel('user');  
    var uname = req.body.uname;
    departModel.findOne({name:uname},function(err, data){
        if(err){
            // 接口返回对象 res.send();
            console.log(err);
        }else if(!data){
            req.session.error = '部门不存在';
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