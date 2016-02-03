'use strict';

/**
 * 定义首页控制器
 */
define(function(require, exports, module) {
    module.exports = function(app) {
        //var config = require('common/config');
        app.register.controller('indexCtrl', function($scope, $http, $rootScope) {
            $rootScope.title = "Home 34534543Page";
        });
    }
});