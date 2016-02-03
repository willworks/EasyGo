'use strict';

/**
 * 定义通知控制器
 */
define(function(require, exports, module) {
    module.exports = function(app) {
        //var config = require('common/config');
        app.register.controller('noticeListCtrl', function($scope, $http, $rootScope) {
            $rootScope.title = "NoticeList Page";
			$scope.name = "Lo Page";
        });
    }
});