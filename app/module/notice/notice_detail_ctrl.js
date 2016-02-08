'use strict';

/**
 * 定义通知控制器
 */
define(function(require, exports, module) {
	
    module.exports = function(app) {
    	
        //var xhr = require('common/service/xhr');
        
        app.register.controller('noticeDeatilCtrl', function($scope, $http, $rootScope) {
			$rootScope.title = "NoticeDeatil Page";
			$scope.name = "Lo Page";
        });
    }
});