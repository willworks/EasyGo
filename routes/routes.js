// controllers
var mainCtrl = require('../controllers/mainCtrl'),
    userCtrl = require('../controllers/userCtrl'),
    departCtrl = require('../controllers/departCtrl'),
    applyCtrl = require('../controllers/applyCtrl'),
    noticeCtrl = require('../controllers/noticeCtrl');

module.exports = function (app) {
    // ===================设置路由===================
    // PS: :id 可以在 req.params.id获取到
    //     POST的数据经过body-parser处理，可直接通过req.body.xxx获取
    // 登陆控制
    app.get('/', mainCtrl.index);
    app.post('/login', mainCtrl.login);
    app.get('/logout', mainCtrl.logout);

    // 用户控制
    app.get('/user', userCtrl.index);
    app.post('/user/add', userCtrl.add);
    app.get('/user/:id', userCtrl.list);
    app.put('/user/:id/edit', userCtrl.edit);
    app.delete('/user/:id/delete', userCtrl.delete);

    // 部门控制
    app.get('/depart', departCtrl.index);
    app.post('/depart/add', departCtrl.add);
    app.get('/depart/:id', departCtrl.list);
    app.put('/depart/:id/edit', departCtrl.edit);
    app.delete('/depart/:id/delete', departCtrl.delete);

    // 申请控制
    app.get('/apply', applyCtrl.index);
    app.post('/apply/add', applyCtrl.add);
    app.get('/apply/:id', applyCtrl.list);
    app.put('/apply/:id/edit', applyCtrl.edit);
    app.delete('/apply/:id/delete', applyCtrl.delete);

    // 通知控制
    app.get('/notice', noticeCtrl.index);
    app.post('/notice/add', noticeCtrl.add);
    app.get('/notice/:id', noticeCtrl.list);
    app.put('/notice/:id/edit', noticeCtrl.edit);
    app.delete('/notice/:id/delete', noticeCtrl.delete);

    // ==============================================

    // 通过通配符处理没有经过路由的所有404页面，必须放在上边所有路由最后
    app.get('*', function(req, res){
        res.send('404');
    });
};