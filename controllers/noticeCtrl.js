/// <reference path="../typings/node/node.d.ts"/>
/*
var xmlhttp = new XMLHttpRequest();
var notice = 'title=00111101211u0122i40&content=222&recipient_id={"userId":"5672592b202517dedb"},{"userId":"2517dedb"},{"userId":"5670f202517dedb"}';
xmlhttp.open('POST','http://localhost:3000/api/v1.0/notice/add',true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send(notice);
*/

// query={elete_flag:'false'}在服务端筛选好数据
exports.tome = function(req, res, next) {
    var noticeModel = global.dbConn.getModel('notice');  
    var recipient_id = req.session.user._id;

    // 查询子文档
    noticeModel.find({'recipient_id.userId':recipient_id, delete_flag:'false'},function(err, data){
        if(err){ 
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(!data){
            req.session.error = '通知不存在';
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


// query={elete_flag:'false'}在服务端筛选好数据
exports.fromme = function(req, res, next) {
    var noticeModel = global.dbConn.getModel('notice');  
    var applicant_id = req.session.user._id;

    // 查询子文档
    noticeModel.find({'applicant_id':applicant_id, delete_flag:'false'},function(err, data){
        if(err){ 
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(!data){
            req.session.error = '通知不存在';
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
    var noticeModel = global.dbConn.getModel('notice');  
    var title = req.body.title;
    var content = req.body.content;
    var applicant_id = req.session.user._id;
    var recipient_id = req.body.recipient_id;
    var delete_flag = 'false';
    console.log('notice' + req.body);
    // 格式化提交参数
    var recipient = [];
    for(var i=0; i<recipient_id.length; i++) { 
        recipient[i] = new Object();
        recipient[i].userId = recipient_id[i]._id;
        recipient[i].read = "false";
        console.log(recipient_id[i]._id);
    } 
    
    console.log('all' + recipient);
    // 查询——创建——创建子文档
    noticeModel.findOne({title: title},function(err, data){
        if(err){ 
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(data){ 
            // 对应title已经有数据
            req.session.error = '通知已存在';
            // 接口返回对象 res.send();
            res.send({
                "code":"2",
                "msg":"exist",
                "data":""
            });
        }else{ 
            noticeModel.create({ 
                'title' : title,
                'content' : content,
                'applicant_id' : applicant_id,
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
                    // mongooseModel.update(conditions, update, options, callback)
                    noticeModel.update(
                        {'_id':data._id}, 
                        {'$push':{'recipient_id':{'$each': recipient}}},
                        {upsert : true},
                        function(err){
                            if (err) {
                                // 不能更新子文档
                                noticeModel.remove(
                                    {'_id':data._id},
                                    function(err, data){
                                        if(err){
                                            // 更新不了子文档且删除失败
                                            res.send({
                                                "code":"3",
                                                "msg":err,
                                                "data":""
                                            });
                                            console.log(err);
                                        } else {
                                            // 更新不了子文档但删除成功
                                            res.send({
                                                "code":"3",
                                                "msg":data,
                                                "data":""
                                            });
                                            console.log(data);
                                        }
                                    });

                            } else {
                                res.send({
                                    "code":"1",
                                    "msg":"success",
                                    "data":data
                                });
                            }
                        }
                    );

                }
            });
        }
    });

};


exports.detail = function(req, res, next) {
    var noticeModel = global.dbConn.getModel('notice');  
    var id = req.params.id;

    noticeModel.findOne({"_id": id},function(err, data){
        if(err){
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(!data){
            req.session.error = '通知不存在';
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
    var noticeModel = global.dbConn.getModel('notice'); 
    // console.log(req.params.id);
    // console.log(req.body);
    var id = req.params.id;
    var params = req.body;
    var delete_flag = 'true';

    noticeModel.findOneAndUpdate({"_id": id}, params, {new: false}, function(err, data){
        if(err){ 
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(!data){
            req.session.error = '通知不存在';
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
    var noticeModel = global.dbConn.getModel('notice'); 
    // console.log(req.params.id);
    var id = req.params.id;
    var delete_flag = 'true';

    noticeModel.findOneAndUpdate({"_id": id}, {"delete_flag": delete_flag}, {new: false}, function(err, data){
        if(err){ 
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(!data){
            req.session.error = '通知不存在';
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


exports.read = function(req, res, next) {
    var noticeModel = global.dbConn.getModel('notice'); 
    var recipient_id = req.session.user._id;
    //var recipient_id = "5672592b4c970f202517dedb";
    var id = req.params.id;
    var delete_flag = 'true';

    noticeModel.findOneAndUpdate({"_id": id,"recipient_id.userId":recipient_id}, {$set: { "recipient_id.$.read" : delete_flag }}, {new: false}, function(err, data){
        if(err){ 
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(!data){
            req.session.error = '通知不存在';
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