'use strict';

/**
 * 定义用户控制器
 */
define(function(require, exports, module) {
	
    module.exports = function(app) {
    	
        //var xhr = require('common/service/xhr');
        
        app.register.controller('userDetailCtrl', function($scope, $http, $rootScope) {
			$rootScope.title = "UserDetail Page";
			$scope.name = "Lo Page";
        });
    }
});