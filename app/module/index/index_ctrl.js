
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


            // 服务端和客户端的双重校验
            // 每个页面加载前执行确认接口权限
            authenticationSvc.isLogin()
            .then(
            	// 安全路由确认客户端已经登陆，isLogin()确认服务器端登陆
            	function(){
            		// -------------混乱数据区-------------
            		$rootScope.title = "EasyGo";
            		$scope.uname = authenticationSvc.getUserInfo().uname;
            		// -------------混乱数据区-------------
            		

            		// 页面加载请求数据
            		networkSvc.getList('notice')
            		.then(
            			// networkSvc.getList() resolve接口
            		    function(res){
            		        switch(res.data.code){
            		            case '-99':
            		                alert('请先登录');
            		                $location.path("/login");
            		                break;
            		            case '0':
            		                alert('失败了，程序猿在奋力为你解决');
            		                break;
            		            case '1':
            		                // 左边nav选项
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
            		                break;
            		            default:
            		                $scope.info = '失败了，程序猿在奋力为你解决';
            		                break;
            		        }
            		    },
            		    // networkSvc.getList() reject接口
            		    function(err){
            		        $log.log(err);
            		    },
            		    // networkSvc.getList() notify接口
            		    function(proc){
            		        // loading
            		    }
            		);
            	},
            	// 客户端以及登陆而服务器端未登录
            	function(){
            		alert('请先登录');
            		$location.path("/login");
            	}
            );





			// 登出操作
			$scope.logout = function () {
			    authenticationSvc.logout()
			    	.then(
		    			// authenticationSvc.logout() resolve接口
		    		    function(res){
		    		        switch(res.data.code){
		    		            case '1':
		    		            	$location.path("/login");
		    		                break;
		    		            default:
			    		            alert('失败了，程序猿在奋力为你解决');
			    		            break;
		    		        }
		    		    },
		    		    // authenticationSvc.logout() reject接口
		    		    function(err){
		    		        $log.log(err);
		    		    },
		    		    // authenticationSvc.logout() notify接口
		    		    function(proc){
		    		        // loading
		    		    }
			    	);
			}

        });
    }
});

