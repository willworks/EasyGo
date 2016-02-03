'use strict';

/**
 * 定义登陆控制器
 */
define(function(require, exports, module) {
    module.exports = function(app) {
        //var config = require('common/config');
        app.register.controller('loginCtrl', function($scope, $http, $rootScope) {
            $rootScope.title = "Login Page";
            $scope.name = "Lo Page";
        });
    }
});