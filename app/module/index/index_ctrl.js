'use strict';

/**
 * 定义首页控制器
 */
define(function(require, exports, module) {
	
    module.exports = function(app) {
    	
        require('common/service/networkSvc')(app);
        require('common/service/authenticationSvc')(app);
        
        app.register.controller('indexCtrl', function($scope, $http, $rootScope, networkSvc, authenticationSvc) {
            $rootScope.title = "EasyGo";
            networkSvc.getDeatil('user', '12');
            authenticationSvc.getUserInfo();
        });
    }
});