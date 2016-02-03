'use strict';

/**
 * 定义申请控制器
 */
define(function(require, exports, module) {
    module.exports = function(app) {
        //var config = require('common/config');
        app.register.controller('applyListCtrl', function($scope, $http, $rootScope) {
            $rootScope.title = "ApplyList Page";
            $scope.name = "Lo Page";
        });
    }
});