/// <reference path="../typings/node/node.d.ts"/>
/*
var xmlhttp = new XMLHttpRequest();
var depart = "name=21212&leader_id=222&depart_upper_id=333";
xmlhttp.open('POST','http://localhost:3000/api/v1.0/depart/add',true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send(depart);
 */

exports.list = function(req, res, next) {
    var departModel = global.dbConn.getModel('depart');  
    // 罗列所有部门
    departModel.find({},function(err, data){
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


exports.detail = function(req, res, next) {
    var departModel = global.dbConn.getModel('depart');  
    var id = req.params.id;

    departModel.findOne({"_id": id},function(err, data){
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
    var departModel = global.dbConn.getModel('depart'); 
    // console.log(req.params.id);
    // console.log(req.body);
    var id = req.params.id;
    var params = req.body;
    var delete_flag = 'true';

    departModel.findOneAndUpdate({"_id": id}, params, {new: false}, function(err, data){
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


exports.delete = function(req, res, next) {
    var departModel = global.dbConn.getModel('depart'); 
    // console.log(req.params.id);
    var id = req.params.id;
    var delete_flag = 'true';

    departModel.findOneAndUpdate({"_id": id}, {"delete_flag": delete_flag}, {new: false}, function(err, data){
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