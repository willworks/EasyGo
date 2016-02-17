'use strict';

/**
 * 定义登陆控制器
 */
define(function(require, exports, module) {
	
    module.exports = function(app) {
    	
        require('common/service/networkSvc');
        require('common/service/authenticationSvc');
        
        app.register.controller('loginCtrl', function($scope, $http, $rootScope, networkSvc, authenticationSvc) {
            $rootScope.title = "Login Page";
            $scope.name = "Lo Page";
            authenticationSvc.login(123,123);
            //authenticationSvc.logout();
        });
    }
});