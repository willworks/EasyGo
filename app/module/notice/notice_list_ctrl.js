'use strict';
/// <reference path="typings/angular/angular.d.ts"/>
/**
 * 定义首页控制器
 */
define(function(require, exports, module) {
	
    module.exports = function(app) {
    	
        require('common/service/networkSvc');
        require('common/service/authenticationSvc');

        // auth为路由改变时的登陆标记
        app.register.controller('noticeListCtrl', function($scope, $http, $rootScope, networkSvc, $location, auth, authenticationSvc, $log, $modal, $select, $alert) {


            // 服务端和客户端的双重校验
            // 每个页面加载前执行确认接口权限
            authenticationSvc.isLogin()
            .then(
            	// 安全路由确认客户端已经登陆，isLogin()确认服务器端登陆
            	function(){
            		// -------------------------混乱数据区-------------------------
            		$rootScope.title = "NoticeList Page";
            		$scope.uname = authenticationSvc.getUserInfo().uname;

                    // 左边nav选项
                    $scope.navInitIndex = 2;
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

            		// -------------------------混乱数据区-------------------------
            		

		            //=============================start 页面主逻辑位置=============================
		            /*
		             * 页面渲染逻辑在这里，确保在请求逻辑搞定之后再开始
		             */

		            $scope.init = function () {
						// 页面加载请求数据
						networkSvc.getList($scope.param, 'fromme')
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
	    					            $scope.item = res.data.data;
	    					            $log.log($scope.item);
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
		            }
		            $scope.init();

					$scope.clickTabBtn = function(tabIndex){
						$scope.tabInitIndex = tabIndex;
						switch($scope.tabInitIndex){
							case '0':
		    					// 页面加载请求数据
		    					networkSvc.getList($scope.param, 'fromme')
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
			    					            $scope.item = res.data.data;
			    					            $log.log($scope.item);
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
								break;
							case '1':
		    					// 页面加载请求数据
		    					networkSvc.getList($scope.param, 'tome')
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
			    					            $scope.item = res.data.data;
			    					            $log.log($scope.item);
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
								break;
							case '2':
								console.log(3);
								break;
							default:
								console.log(出错了);
								break;
						}
					}

                    // http://mgcrea.github.io/angular-strap/

                    $scope.dialog = {
                    	scope: $scope,
                    	title : ' ', 
                    	content : ' ', 
                    	recipient : "['5672592b4c970f202517dedb','1','2']",
                    	animation : "am-fade-and-slide-top",
                    	template : "common/directive/dialog.html",
                        selectedDeparts : [],
                        departs : [],
                        selectedUsers : [],
                        users : []
                    };

                    // 弹出新增页面
                    $scope.addItemPanel = function() {
                        $modal($scope.dialog).show;
                    };

                    // 新增内容
                    $scope.addItem = function (modal) {
                    	var data = {
                    	    "title":$scope.dialog.title,
                    	    "content":$scope.dialog.content,
                    	    "recipient_id":$scope.dialog.selectedUsers,
                    	};
                        console.log($scope.dialog);
                    	networkSvc.addItem($scope.param,data)
                    	.then(
        					// networkSvc.addItem() resolve接口
        				    function(res){
        				        switch(res.data.code){
        				            case '-99':
        				                alert('请先登录');
        				                $location.path("/login");
        				                break;
        				            case '1':
        				            	modal.$hide();
        				            	networkSvc.getList($scope.param, 'fromme')
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
        				            	                $scope.item = res.data.data;
        				            	                break;
        				            	            default:
        				            	                alert('失败了，程序猿在奋力为你解决');
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

        				            	// 将最新插入的数据插入到repeat数组里动态改变
        				            	// $scope.item.push(res.data.data);
        				                break;
        				            case '2':
        				            	alert('标题已经存在');
        				                break;
        				            case '3':
        				            	alert('数据插入失败');
        				                break;
        				            default:
        				                alert('失败了，程序猿在奋力为你解决');
        				                break;
        				        }
        				    },
        				    // networkSvc.addItem() reject接口
        				    function(err){
        		                alert('失败了，程序猿在奋力为你解决');
        				        $log.log(err);
        				    },
        				    // networkSvc.addItem() notify接口
        				    function(proc){
        				        // loading
        				    }
                    	);
                    }

                    $scope.showDetail = function($index, itemId) {
                    	alert(itemId + ' 开发中');
                    };

                    $scope.deleteItemPanel = function (index, item_id) {
                    	$scope.confirm = true;
                    	$scope.data = {
                    		'index' : index,
                    		'item' : item_id
                    	}
                    }

                    $scope.deleteItem = function () {
                    	networkSvc.deleteItem($scope.param, $scope.data.item)
                    	.then(
			    			// networkSvc.deleteItem() resolve接口
			    		    function(res){
			    		        switch(res.data.code){
			    		        	case '-99':
			    		        	    alert('请先登录');
			    		        	    $location.path("/login");
			    		        	    break;
			    		            case '1':
			    		                // 删除数组实时更改
			    		            	$scope.item.splice($scope.data.index,1);
			    		            	$scope.confirm = false;
			    		                break;
			    		            default:
				    		            alert('失败了，程序猿在奋力为你解决');
				    		            break;
			    		        }
			    		    },
			    		    // networkSvc.deleteItem() reject接口
			    		    function(err){
		                        alert('失败了，程序猿在奋力为你解决');
			    		        $log.log(err);
			    		    },
			    		    // networkSvc.deleteItem() notify接口
			    		    function(proc){
			    		        // loading
			    		    }
                    	);
                    }
                    
                    
                    $scope.getDepartList = function () {
                        networkSvc.getDepartList()
                        .then(
                            function (res) {
                                $scope.dialog.departs = res.data.data;
                                //console.log(res.data);
                            },
			    		    // networkSvc.deleteItem() reject接口
			    		    function(err){
		                        //
			    		    },
			    		    // networkSvc.deleteItem() notify接口
			    		    function(proc){
			    		        // loading
			    		    }
                        );
                    }
                    
                    $scope.getUserList = function (data) {
                        networkSvc.getUserList(data)
                        .then(
                            function (res) {
                                $scope.dialog.users = res.data.data;
                                //console.log(res.data);
                            },
			    		    // networkSvc.deleteItem() reject接口
			    		    function(err){
		                        //
			    		    },
			    		    // networkSvc.deleteItem() notify接口
			    		    function(proc){
			    		        // loading
			    		    }
                        );
                    }
                    //=============================end 页面主逻辑位置=============================
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

