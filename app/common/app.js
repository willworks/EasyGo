"use strict";

/**
 * 程序主入口
 */
define(function(require, exports, module) {

    // 引入的service需要在主模块注入才能提供给其他的controllor使用
    require('common/service/networkSvc');
    require('common/service/authenticationSvc');
    require('common/service/devSvc');

    var app = angular.module('app', ['ngRoute', 'angular-lazyload', 'authenticationSvc', 'networkSvc', 'devSvc', 'mgcrea.ngStrap', 'ngAnimate']);

    //注册路由
    //resolve用于客户端的校验，而authenticationSvc.islogin()用于确认服务端的校验情况
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
        .when('/', {  
            redirectTo: '/index'
        })  
        .when('/index', {  
            name: "首页",
            controller: 'indexCtrl',
            controllerUrl: './module/index/index_ctrl.js',
            templateUrl: './module/index/index_tpl.html',
            resolve: {
                auth: ["$q", "authenticationSvc", function($q, authenticationSvc) {
                    var userInfo = authenticationSvc.getUserInfo();
                    if (userInfo) {
                        return $q.when(userInfo);
                    } else {
                        return $q.reject({ authenticated: false });
                    }
                }]
            }
        })  
        .when('/login', {  
            name: "登陆",
            controller: 'loginCtrl',
            controllerUrl: './module/login/login_ctrl.js',
            templateUrl: './module/login/login_tpl.html'
        })  
        .when('/user', {
            name:"查看用户列表",
            controller: 'userListCtrl',
            controllerUrl: './module/user/user_list_ctrl.js',
            templateUrl: './module/user/user_list_tpl.html',
            resolve: {
                auth: ["$q", "authenticationSvc", function($q, authenticationSvc) {
                    var userInfo = authenticationSvc.getUserInfo();
                    if (userInfo) {
                        return $q.when(userInfo);
                    } else {
                        return $q.reject({ authenticated: false });
                    }
                }]
            }
        })
        .when('/user/:id', {
            name:"查看用户详细信息",
            controller: 'userDetailCtrl',
            controllerUrl: './module/user/user_detail_ctrl.js',
            templateUrl: './module/user/user_detail_tpl.html',
            resolve: {
                auth: ["$q", "authenticationSvc", function($q, authenticationSvc) {
                    var userInfo = authenticationSvc.getUserInfo();
                    if (userInfo) {
                        return $q.when(userInfo);
                    } else {
                        return $q.reject({ authenticated: false });
                    }
                }]
            }
        })
        .when('/apply', {
            name:"指向到用户的申请列表",
            controller: 'applyListCtrl',
            controllerUrl: './module/apply/apply_list_ctrl.js',
            templateUrl: './module/apply/apply_list_tpl.html',
            resolve: {
                auth: ["$q", "authenticationSvc", function($q, authenticationSvc) {
                    var userInfo = authenticationSvc.getUserInfo();
                    if (userInfo) {
                        return $q.when(userInfo);
                    } else {
                        return $q.reject({ authenticated: false });
                    }
                }]
            }
        })
        .when('/apply/:id', {
            name:"具体申请信息",
            controller: 'applyDetailCtrl',
            controllerUrl: './module/apply/apply_detail_ctrl.js',
            templateUrl: './module/apply/apply_detail_tpl.html',
            resolve: {
                auth: ["$q", "authenticationSvc", function($q, authenticationSvc) {
                    var userInfo = authenticationSvc.getUserInfo();
                    if (userInfo) {
                        return $q.when(userInfo);
                    } else {
                        return $q.reject({ authenticated: false });
                    }
                }]
            }
        })
        .when('/notice', {
            name:"发送到用户的通知列表",
            controller: 'noticeListCtrl',
            controllerUrl: './module/notice/notice_list_ctrl.js',
            templateUrl: './module/notice/notice_list_tpl.html',
            resolve: {
                auth: ["$q", "authenticationSvc", function($q, authenticationSvc) {
                    var userInfo = authenticationSvc.getUserInfo();
                    if (userInfo) {
                        return $q.when(userInfo);
                    } else {
                        return $q.reject({ authenticated: false });
                    }
                }]
            }
        })
        .when('/notice/:id', {
            name:"通知的具体内容",
            controller: 'noticeDetailCtrl',
            controllerUrl: './module/notice/notice_detail_ctrl.js',
            templateUrl: './module/notice/notice_detail_tpl.html',
            resolve: {
                auth: ["$q", "authenticationSvc", function($q, authenticationSvc) {
                    var userInfo = authenticationSvc.getUserInfo();
                    if (userInfo) {
                        return $q.when(userInfo);
                    } else {
                        return $q.reject({ authenticated: false });
                    }
                }]
            }
        })
        .when('/dev', {
            name:"开发管理界面",
            controller: 'devCtrl',
            controllerUrl: './module/dev/dev_ctrl.js',
            templateUrl: './module/dev/dev_tpl.html',
            resolve: {
                auth: ["$q", "authenticationSvc", function($q, authenticationSvc) {
                    var userInfo = authenticationSvc.getUserInfo();
                    if (userInfo) {
                        return $q.when(userInfo);
                    } else {
                        return $q.reject({ authenticated: false });
                    }
                }]
            }
        })
        .otherwise({
            redirectTo: '/index'
        });
    }]);

    app.run(['$rootScope', '$lazyload', '$window', '$http', '$location', '$log',
        function($rootScope, $lazyload, $window, $http, $location, $log) {
            //初始化按需加载
            $lazyload.init(app);
            app.register = $lazyload.register;

            // 监听route变化
            // BUG:无法显示$q.when()传递的值

            // 路由resolve
            $rootScope.$on("$routeChangeSuccess", function(userInfo) {
                $log.log(userInfo);
            });
            
            // 路由reject
			$rootScope.$on("$routeChangeError", function(event, current, previous, eventObj) {
				if (eventObj.authenticated === false) {
                    alert('请先登录');
					$location.path("/login");
				}
			});

        }
    ]);

    module.exports = app;
});
