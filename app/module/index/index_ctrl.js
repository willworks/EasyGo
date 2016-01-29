/**
 * 定义首页控制器
 */
define(function(require, exports, module) {
    module.exports = function(app) {
        // var config = require('common/config');
        // require('common/service/page')(app);
        // require('common/service/vendor')(app);
        // require('bower_component/zeroclipboard/dist/ZeroClipboard.min');
        // app.register.controller('indexCtrl', function($scope, $http, $rootScope){
        //     $rootScope.title = "Home Page";
        // });
        // angular.module("app",[]).controller("indexCtrl",["$scope",test.conttt]);
        angular.module('app',[]).controller('indexCtrl', function($scope, $http, $rootScope){
            $rootScope.title = "Home Page";
        });
    };
});

