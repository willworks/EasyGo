'use strict';

/**
 * 定义首页控制器
 */
define(function(require, exports, module) {
	
    module.exports = function(app) {
    	
        require('common/service/networkSvc');
        require('common/service/authenticationSvc');

        // auth为路由改变时的登陆标记
        app.register.controller('indexCtrl', function($scope, $http, $rootScope, networkSvc, $location, auth, authenticationSvc, $log) {
            $rootScope.title = "EasyGo";

            var loginPromise = networkSvc.getList('notice');
            loginPromise.then(
                function(res){
                    alert('需要加入loading');
                    $log.log(res.data);
                },
                // authenticationSvc.login() reject接口
                function(err){
                    $log.log(err);
                }
            )

            // 登出操作
            $scope.logout = function () {
                authenticationSvc.logout();
                $location.path("/login");
            }

            $scope.uname = authenticationSvc.getUserInfo().uname;

            $scope.navInitIndex = 0;
            $scope.navs = [
                {'name' : '团队通知','index' : '0','param' : 'all'},
                {'name' : '申请发起','index' : '1','param' : 'pending'},
                {'name' : '我的申请','index' : '2','param' : 'unstart'},
                {'name' : '我的审批','index' : '3','param' : 'passed'},
                {'name' : '发布通知','index' : '4','param' : 'failed'},
            ];


            $scope.clickNavBtn = function(index){
                $scope.navInitIndex = index;
                console.log($scope.navInitIndex);
            }
        });
    }
});