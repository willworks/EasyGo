// controllers
var mainCtrl = require('../controllers/mainCtrl'),
    userCtrl = require('../controllers/userCtrl'),
    departCtrl = require('../controllers/departCtrl'),
    applyCtrl = require('../controllers/applyCtrl'),
    noticeCtrl = require('../controllers/noticeCtrl');

module.exports = function (app) {
    // ===================设置路由===================
    // :id 可以在 req.params.id获取到
    // POST的数据经过body-parser处理，可直接通过req.body.xxx获取
    // #anchor 锚点可以通过window.location.hash获取
    // Angular的路由形式为"/#"，可以防止浏览器刷新页面或者请求数据
    
    // 入口重定向
    app.get('/', mainCtrl.index);

    // 登陆接口
    app.post('/api/v1.0/login', mainCtrl.login);
    app.get('/api/v1.0/logout', mainCtrl.logout);
    app.get('/api/v1.0/isLogin', mainCtrl.isLogin);

    // 用户接口
    // 需要插入部门id
    app.post('/api/v1.0/user', userCtrl.list); //罗列指定部门id下的所有用户，支持批量查询
    
    app.post('/api/v1.0/user/add', userCtrl.add);
    app.get('/api/v1.0/user/:id', userCtrl.detail); //用户详细信息
    app.put('/api/v1.0/user/:id/edit', userCtrl.edit);
    app.delete('/api/v1.0/user/:id/delete', userCtrl.delete);

    // 部门接口
    app.get('/api/v1.0/depart', departCtrl.list); //罗列全部部门列表
    
    app.post('/api/v1.0/depart/add', departCtrl.add);
    app.get('/api/v1.0/depart/:id', departCtrl.detail); //部门详细信息
    app.put('/api/v1.0/depart/:id/edit', departCtrl.edit);
    app.delete('/api/v1.0/depart/:id/delete', departCtrl.delete);

    // 申请接口
    app.get('/api/v1.0/apply/fromme', applyCtrl.fromme);
    app.get('/api/v1.0/apply/tome', applyCtrl.tome);
    
    app.post('/api/v1.0/apply/add', applyCtrl.add);
    app.get('/api/v1.0/apply/:id', applyCtrl.detail);
    app.put('/api/v1.0/apply/:id/edit', applyCtrl.edit);
    app.delete('/api/v1.0/apply/:id/delete', applyCtrl.delete);
    app.delete('/api/v1.0/apply/:id/read', applyCtrl.read);

    // 通知接口
    app.get('/api/v1.0/notice/fromme', noticeCtrl.fromme);
    app.get('/api/v1.0/notice/tome', noticeCtrl.tome);
    
    app.post('/api/v1.0/notice/add', noticeCtrl.add);
    app.get('/api/v1.0/notice/:id', noticeCtrl.detail);
    app.put('/api/v1.0/notice/:id/edit', noticeCtrl.edit);
    app.delete('/api/v1.0/notice/:id/delete', noticeCtrl.delete);
    app.delete('/api/v1.0/notice/:id/read', noticeCtrl.read);

    // ==============================================

    // 通过通配符处理没有定义路由的请求(必须放在路由表的最后)
    app.get('*', function(req, res){
        res.send({
            "code":"-99",
            "msg":"Bad request!",
            "data":""
        });
    });
};