'use strict';

/**
 * 定义登陆控制器
 */
define(function(require, exports, module) {
	
    module.exports = function(app) {
    	
        require('common/service/networkSvc');
        require('common/service/authenticationSvc');
        
        app.register.controller('loginCtrl', function($scope, $http, $rootScope, networkSvc, authenticationSvc, $location, $log) {
            $rootScope.title = "Login Page";

            $scope.login = function () {
                // 登陆操作
                authenticationSvc.login($scope.uname,$scope.upwd)
                //authenticationSvc.login(123,123)
                .then(function(res){
                    $log.log(res);
                    //$location.path("/index");
                });
            }

        });
    }
});