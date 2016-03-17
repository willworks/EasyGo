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
    app.get('/api/v1.0/user', userCtrl.index);
    app.post('/api/v1.0/user/add', userCtrl.add);
    app.get('/api/v1.0/user/:id', userCtrl.list);
    app.put('/api/v1.0/user/:id/edit', userCtrl.edit);
    app.delete('/api/v1.0/user/:id/delete', userCtrl.delete);

    // 部门接口
    app.get('/api/v1.0/depart', departCtrl.index);
    app.post('/api/v1.0/depart/add', departCtrl.add);
    app.get('/api/v1.0/depart/:id', departCtrl.list);
    app.put('/api/v1.0/depart/:id/edit', departCtrl.edit);
    app.delete('/api/v1.0/depart/:id/delete', departCtrl.delete);

    // 申请接口
    app.get('/api/v1.0/apply', applyCtrl.index);
    app.post('/api/v1.0/apply/add', applyCtrl.add);
    app.get('/api/v1.0/apply/:id', applyCtrl.list);
    app.put('/api/v1.0/apply/:id/edit', applyCtrl.edit);
    app.delete('/api/v1.0/apply/:id/delete', applyCtrl.delete);

    // 通知接口
    app.get('/api/v1.0/notice', noticeCtrl.index);
    app.post('/api/v1.0/notice/add', noticeCtrl.add);
    app.get('/api/v1.0/notice/:id', noticeCtrl.list);
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