'use strict';

/**
 * 定义通知控制器
 */
define(function(require, exports, module) {
	
    module.exports = function(app) {
    	
        //var xhr = require('common/service/xhr');
        
        app.register.controller('noticeListCtrl', function($scope, $http, $rootScope) {
            $rootScope.title = "NoticeList Page";
			$scope.name = "Lo Page";
        });
    }
});