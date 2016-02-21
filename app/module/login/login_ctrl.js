'use strict';

/**
 * 定义登陆控制器
 */
define(function(require, exports, module) {
	
    module.exports = function(app) {
    	
        require('common/service/networkSvc');
        require('common/service/authenticationSvc');
        
        app.register.controller('loginCtrl', function($scope, $http, $rootScope, networkSvc, authenticationSvc, $location, $log, $timeout) {
            
            // -------------混乱数据区-------------
            $rootScope.title = "Login Page";
            // -------------混乱数据区-------------

            // 登陆操作
            $scope.login = function () {
                authenticationSvc.login($scope.uname,$scope.upwd)
                .then(
                    // authenticationSvc.login() resolve接口
                    function(res){
                        $scope.infoShow = true;
                        switch(res.data.code){
                            case '1':
                                $scope.info = '登陆成功';
                                $scope.infoSuccess = true;
                                $timeout(
                                    function() {
                                        $location.path("/index");
                                    },1000
                                );
                                break;
                            case '-1':
                                $scope.info = '用户名不存在';
                                $scope.infoSuccess = false;
                                break;
                            case '-2':
                                $scope.info = '密码错误';
                                $scope.infoSuccess = false;
                                break;
                            default:
                                $scope.info = '失败了，程序猿在奋力为你解决';
                                $scope.infoSuccess = false;
                                break;
                        }
                    },
                    // authenticationSvc.login() reject接口
                    function(err){
                    	$scope.infoShow = true;
                        $scope.info = '失败了，程序猿在奋力为你解决';
                        $scope.infoSuccess = false;
                    },
	                // authenticationSvc.login() notify接口
	                function(proc){
	                    // loading
	                }
                )
            }


            // 注册操作
            $scope.signin = function (){}

        });
    }
});