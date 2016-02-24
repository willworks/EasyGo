/*
var xmlhttp = new XMLHttpRequest();
var notice = "title=222&content=222&recipient_id=['5672592b4c970f202517dedb','56714c62725ef0741119966e']";
xmlhttp.open('POST','http://localhost:3000/api/v1.0/notice/add',true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send(notice);
 */

exports.index = function(req, res, next) {
    var noticeModel = global.dbConn.getModel('notice');  
    var applicant_id = req.session.user._id;

    noticeModel.find({applicant_id: applicant_id},function(err, data){
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
                'recipient_id' : recipient_id,
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