'use strict';

/**
 * 定义首页控制器
 */
define(function(require, exports, module) {
	
    module.exports = function(app) {
    	
        require('common/service/networkSvc');
        require('common/service/authenticationSvc');

        // auth为路由改变时的登陆标记
        app.register.controller('applyListCtrl', function($scope, $http, $rootScope, networkSvc, $location, auth, authenticationSvc, $log, $modal, $alert) {


            // 服务端和客户端的双重校验
            // 每个页面加载前执行确认接口权限
            authenticationSvc.isLogin()
            .then(
            	// 安全路由确认客户端已经登陆，isLogin()确认服务器端登陆
            	function(){
            		// -------------------------混乱数据区-------------------------
            		$rootScope.title = "ApplyList Page";
            		$scope.uname = authenticationSvc.getUserInfo().uname;

                    // 左边nav选项
                    $scope.navInitIndex = 1;
                    $scope.navs = [
                        {'name' : '团队管理','index' : '0','param' : 'depart'},
                        {'name' : '申请管理','index' : '1','param' : 'apply'},
                        {'name' : '通知管理','index' : '2','param' : 'notice'},
                    ];

                    // 右侧tab切换
                    $scope.tabInitIndex = 0;
                    $scope.allTabs = {
                        'notice' : [
                            {'name' : '未读通知','index' : '0','param' : 'unread'},
                            {'name' : '已读通知','index' : '1','param' : 'read'},
                            {'name' : '我的通知','index' : '2','param' : 'mine'}
                        ],

                        'apply' : [
                            {'name' : '未读申请','index' : '0','param' : 'unread'},
                            {'name' : '已读申请','index' : '1','param' : 'read'},
                            {'name' : '我的申请','index' : '2','param' : 'mine'}
                        ],

                        'depart' : [
                            {'name' : '未读部门','index' : '0','param' : 'unread'},
                            {'name' : '已读部门','index' : '1','param' : 'read'},
                            {'name' : '我的部门','index' : '2','param' : 'mine'}
                        ],
                    };
                    // param为页面主要参数控制view
                    $scope.param = $scope.navs[$scope.navInitIndex].param;
                    $scope.tabs = $scope.allTabs[$scope.param];


                    // 点击左侧nav联动tab
                    $scope.clickNavBtn = function(navIndex){
                        $scope.navInitIndex = navIndex;
                        $scope.tabInitIndex = 0;
                        // param为页面主要参数控制view
                        $scope.param = $scope.navs[$scope.navInitIndex].param;
                        $scope.tabs = $scope.allTabs[$scope.param];
                        $location.path("/" + $scope.param);

                    }
                    $scope.clickTabBtn = function(tabIndex){
                        $scope.tabInitIndex = tabIndex;
                        console.log('tab ' + $scope.tabInitIndex);
                    }
            		// -------------------------混乱数据区-------------------------
            		

            		// 页面加载请求数据
            		networkSvc.getList($scope.param)
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
            		            //=============================start 页面主逻辑位置=============================
            		            /*
            		             * 页面渲染逻辑在这里，确保在请求逻辑搞定之后再开始
            		             */
                                    $scope.item = res.data.data;
                                    $log.log($scope.item);

                                    // http://mgcrea.github.io/angular-strap/
                                    $scope.showDetail = function(item_id) {
                                        $modal({title: item_id, content: item_id, show: true}).show;
                                    };

                                    $scope.deleteItem = function(item_id) {
                                        $modal({title: item_id, content: item_id, show: true}).show;
                                    };

                                    $scope.addItem = function(item_id) {
                                        $modal({title: item_id, content: item_id, show: true}).show;
                                    };
                                //=============================end 页面主逻辑位置=============================
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

