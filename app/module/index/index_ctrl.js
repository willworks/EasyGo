
'use strict';

/**
 * 定义首页控制器
 */
define(function(require, exports, module) {
	
    module.exports = function(app) {
    	
        require('common/service/networkSvc');
        require('common/service/authenticationSvc');

        // auth为路由改变时的登陆标记
        app.register.controller('indexCtrl', function($scope, $http, $rootScope, networkSvc, $location, auth, authenticationSvc, $log, $modal) {


            // 服务端和客户端的双重校验
            // 每个页面加载前执行确认接口权限
            authenticationSvc.isLogin()
            .then(
            	// 安全路由确认客户端已经登陆，isLogin()确认服务器端登陆
            	function(){
            		// -------------混乱数据区-------------
            		$rootScope.title = "EasyGo";
            		$scope.uname = authenticationSvc.getUserInfo().uname;


                    // 顶部nav选项
                    $scope.navInitIndex = 0;
                    $scope.navs = [
                    	{'name' : $scope.uname,'index' : '0','param' : 'user'},
                        {'name' : '团队管理','index' : '1','param' : 'depart'},
                        {'name' : '申请管理','index' : '2','param' : 'apply'},
                        {'name' : '通知管理','index' : '3','param' : 'notice'},
                    ];
                    $scope.clickNavBtn = function(index){
                        $scope.navInitIndex = index;
                        console.log('nav ' + $scope.navInitIndex);
                    }


                    // 左边nav选项
                    $scope.snavInitIndex = 0;
                    $scope.snavs = [
                        {'name' : '团队管理','index' : '0','param' : 'depart'},
                        {'name' : '申请管理','index' : '1','param' : 'apply'},
                        {'name' : '通知管理','index' : '2','param' : 'notice'},
                    ];
                    $scope.clickSNavBtn = function(index){
                        $scope.snavInitIndex = index;
                        console.log('snav ' + $scope.snavInitIndex);
                    }


                    // tab切换
                    $scope.tabInitIndex = 0;
                    $scope._tabs = {
                    	'notice' : [{'name' : '未读通知','index' : '0','param' : 'unread'},
                        {'name' : '已读通知','index' : '1','param' : 'read'},
                        {'name' : '我的通知','index' : '2','param' : 'mine'}],

                    	'apply' : [{'name' : '未读申请','index' : '0','param' : 'unread'},
                        {'name' : '已读申请','index' : '1','param' : 'read'},
                        {'name' : '我的申请','index' : '2','param' : 'mine'}],

                    	'depart' : [{'name' : '未读部门','index' : '0','param' : 'unread'},
                        {'name' : '已读部门','index' : '1','param' : 'read'},
                        {'name' : '我的部门','index' : '2','param' : 'mine'}],
	                };

                    $scope.tabs = [
                        {'name' : '未读通知','index' : '0','param' : 'unread'},
                        {'name' : '已读通知','index' : '1','param' : 'read'},
                        {'name' : '我的通知','index' : '2','param' : 'mine'},
                    ];

                    $scope.userNavs = [
	                    {'name' : '1','index' : '0','param' : 'all'},
	                    {'name' : '2','index' : '1','param' : 'pending'},
	                    {'name' : '3','index' : '2','param' : 'unstart'}
                    ];
                    $scope.departNavs = [
	                    {'name' : '4','index' : '0','param' : 'all'},
	                    {'name' : '5','index' : '1','param' : 'pending'},
	                    {'name' : '6','index' : '2','param' : 'unstart'}
                    ];
                    $scope.applyNavs = [
	                    {'name' : '7','index' : '0','param' : 'all'},
	                    {'name' : '8','index' : '1','param' : 'pending'},
	                    {'name' : '9','index' : '2','param' : 'unstart'}
                    ];
                    $scope.noticeNavs = [
                    	{'name' : '未读','index' : '0','param' : 'all'},
                    	{'name' : '11','index' : '1','param' : 'pending'},
                    	{'name' : '12','index' : '2','param' : 'unstart'}
                    ];
                    $scope.clickTabBtn = function(index){
                        $scope.tabInitIndex = index;
                        console.log('tab ' + $scope.tabInitIndex);
                    }


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
                                    $scope.notice = res.data.data;
                                    $log.log($scope.notice);

                                    // http://mgcrea.github.io/angular-strap/
                                    // Show a basic modal from a controller
                                    var myModal = $modal({title: 'My Title', content: 'My Content', show: true});

            		                break;
            		            default:
            		                $scope.info = '失败了，程序猿在奋力为你解决';
            		                break;
            		        }
            		    },
            		    // networkSvc.getList() reject接口
            		    function(err){
                            alert('失败了，程序猿在奋力为你解决');
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
                        alert('失败了，程序猿在奋力为你解决');
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

