/*
var xmlhttp = new XMLHttpRequest();
var apply = 'title=00111101211u0122i40&content=222&recipient_id={"userId":"5672592b202517dedb"},{"userId":"2517dedb"},{"userId":"5670f202517dedb"}';
xmlhttp.open('POST','http://localhost:3000/api/v1.0/apply/add',true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send(apply);
*/

exports.tome = function(req, res, next) {
    var applyModel = global.dbConn.getModel('apply');  
    var recipient_id = req.session.user._id;

    // 查询子文档
    applyModel.find({'recipient_id.userId':recipient_id},function(err, data){
        if(err){ 
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(!data){
            req.session.error = '申请不存在';
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


exports.fromme = function(req, res, next) {
    var applyModel = global.dbConn.getModel('apply');  
    var applicant_id = req.session.user._id;

    // 查询子文档
    applyModel.find({'applicant_id':applicant_id},function(err, data){
        if(err){ 
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(!data){
            req.session.error = '申请不存在';
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
    var applyModel = global.dbConn.getModel('apply');  
    var title = req.body.title;
    var content = req.body.content;
    var applicant_id = req.session.user._id;
    var recipient_id = req.body.recipient_id;
    var delete_flag = 'false';

    // 格式化提交参数
    var recipient = [];
    for(var i=0; i<recipient_id.length; i++) { 
        recipient[i] = new Object();
        recipient[i].userId = recipient_id[i];
        recipient[i].read = "false";
    } 

    // 查询——创建——创建子文档
    applyModel.findOne({title: title},function(err, data){
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
            req.session.error = '申请已存在';
            // 接口返回对象 res.send();
            res.send({
                "code":"2",
                "msg":"exist",
                "data":""
            });
        }else{ 
            applyModel.create({ 
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
                    applyModel.update(
                        {'_id':data._id}, 
                        {'$push':{'recipient_id':{'$each': recipient}}},
                        {upsert : true},
                        function(err){
                            if (err) {
                                // 不能更新子文档
                                applyModel.remove(
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
    var applyModel = global.dbConn.getModel('apply');  
    var id = req.params.id;

    applyModel.findOne({"_id": id},function(err, data){
        if(err){
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(!data){
            req.session.error = '申请不存在';
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
    var applyModel = global.dbConn.getModel('apply'); 
    // console.log(req.params.id);
    // console.log(req.body);
    var id = req.params.id;
    var params = req.body;
    var delete_flag = 'true';

    applyModel.findOneAndUpdate({"_id": id}, params, {new: false}, function(err, data){
        if(err){ 
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(!data){
            req.session.error = '申请不存在';
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
    var applyModel = global.dbConn.getModel('apply'); 
    // console.log(req.params.id);
    var id = req.params.id;
    var delete_flag = 'true';

    applyModel.findOneAndUpdate({"_id": id}, {"delete_flag": delete_flag}, {new: false}, function(err, data){
        if(err){ 
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(!data){
            req.session.error = '申请不存在';
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
    var applyModel = global.dbConn.getModel('apply'); 
    var recipient_id = req.session.user._id;
    //var recipient_id = "5672592b4c970f202517dedb";
    var id = req.params.id;
    var delete_flag = 'true';

    applyModel.findOneAndUpdate({"_id": id,"recipient_id.userId":recipient_id}, {$set: { "recipient_id.$.read" : delete_flag }}, {new: false}, function(err, data){
        if(err){ 
            // 接口返回对象 res.send();
            res.send({
                "code":"0",
                "msg":err,
                "data":""
            });
            console.log(err);
        }else if(!data){
            req.session.error = '申请不存在';
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