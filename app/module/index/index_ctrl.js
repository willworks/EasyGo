'use strict';

/**
 * 定义首页控制器
 */
define(function(require, exports, module) {
	
    module.exports = function(app) {
    	
        require('common/service/networkSvc');
        require('common/service/authenticationSvc');

        // auth为路由改变时的登陆标记
        app.register.controller('indexCtrl', function($scope, $http, $rootScope, networkSvc, $location, auth, authenticationSvc) {
            $rootScope.title = "EasyGo";

            $scope.logout = function () {
                // 登出操作
                authenticationSvc.logout();
                $location.path("/login");
            }
        });
    }
});