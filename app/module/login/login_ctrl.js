'use strict';

/**
 * 定义登陆控制器
 */
define(function(require, exports, module) {
	
    module.exports = function(app) {
    	
        require('common/service/xhr')(app);
        
        app.register.controller('loginCtrl', function($scope, $http, $rootScope, xhr) {
            $rootScope.title = "Login Page";
            $scope.name = "Lo Page";
            xhr.test1();
        });
    }
});