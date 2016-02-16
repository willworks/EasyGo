'use strict';

/**
 * 定义首页控制器
 */
define(function(require, exports, module) {
	
    module.exports = function(app) {
    	
        require('common/service/networkSvc')(app);
        require('common/service/authenticationSvc')(app);
        require('common/service/util')(app);

        // auth为路由改变时的登陆标记
        app.register.controller('indexCtrl', function($scope, $http, $rootScope, networkSvc, authenticationSvc, auth, util) {
            $rootScope.title = "EasyGo";
            // networkSvc.getLogin 调用后登陆成功会返回用户名
            // networkSvc.getLogin('123', '123');
            // alert(authenticationSvc.getUserInfo());
            alert(auth);
        });
    }
});