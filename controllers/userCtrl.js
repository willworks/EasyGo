/// <reference path="../typings/node/node.d.ts"/>
/*
var xmlhttp = new XMLHttpRequest();
var user = "name=123456&password=123456&depart_id=1";
xmlhttp.open('POST','http://localhost:3000/api/v1.0/user/add',true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send(user);
 */

// 查询某个部门下的全部员工
exports.list = function(req, res, next) {
    var userModel = global.dbConn.getModel('user');  
    var depart_id = req.body.depart_id;

    userModel.find({depart_id: depart_id},function(err, data){
        if(err){ 
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(!data){
            req.session.error = '用户不存在';
            res.send({
                "code":"-2",
                "msg":"Not Found",
                "data":""
            });
        }else{ 
            res.send({
                "code":"1",
                "msg":"success",
                "data":data
            });
        }
    });
};


exports.add = function(req, res, next) {
    var userModel = global.dbConn.getModel('user'); 
    var name = req.body.name;
    var password = req.body.password;
    var depart_id = req.body.depart_id;
    var delete_flag = 'false';

    userModel.findOne({name: name},function(err, data){
        if(err){ 
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(data){ 
            req.session.error = '用户已存在';
            res.send({
                "code":"2",
                "msg":'exist',
                "data":""
            });
        }else{ 
            userModel.create({ 
                'name' : name,
                'password' : password,
                'depart_id' : depart_id,
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


exports.detail = function(req, res, next) {
    var userModel = global.dbConn.getModel('user');  
    var id = req.params.id;

    userModel.findOne({"_id": id},function(err, data){
        if(err){
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(!data){
            req.session.error = '部门不存在';
            res.send({
                "code":"-2",
                "msg":"Not Found",
                "data":""
            });
        }else{
            res.send({
                "code":"1",
                "msg":"success",
                "data":data
            });
        }
    });
};


exports.edit = function(req, res, next) {
    var userModel = global.dbConn.getModel('user'); 
    // console.log(req.params.id);
    // console.log(req.body);
    var id = req.params.id;
    var params = req.body;
    var delete_flag = 'true';

    userModel.findOneAndUpdate({"_id": id}, params, {new: false}, function(err, data){
        if(err){ 
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(!data){
            req.session.error = '用户不存在';
            res.send({
                "code":"-2",
                "msg":"Not Found",
                "data":""
            });
        }else{ 
            res.send({
                "code":"1",
                "msg":"success",
                "data":data
            });
        }
    });
};


exports.delete = function(req, res, next) {
    var userModel = global.dbConn.getModel('user'); 
    // console.log(req.params.id);
    var id = req.params.id;
    var delete_flag = 'true';

    userModel.findOneAndUpdate({"_id": id}, {"delete_flag": delete_flag}, {new: false}, function(err, data){
        if(err){ 
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(!data){
            req.session.error = '用户不存在';
            res.send({
                "code":"-2",
                "msg":"Not Found",
                "data":""
            });
        }else{ 
            res.send({
                "code":"1",
                "msg":"success",
                "data":data
            });
        }
    });
};