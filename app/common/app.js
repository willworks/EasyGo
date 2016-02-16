"use strict";

/**
 * 程序主入口
 */
define(function(require, exports, module) {

    require('common/service/networkSvc');
    require('common/service/authenticationSvc');

    var app = angular.module('app', ['ngRoute', 'angular-lazyload']);

    //注册路由
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
                auth: function(){
                    return 1234;
                }
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
            templateUrl: './module/user/user_list_tpl.html'
        })
        .when('/user/:id', {
            name:"查看用户详细信息",
            controller: 'userDetailCtrl',
            controllerUrl: './module/user/user_detail_ctrl.js',
            templateUrl: './module/user/user_detail_tpl.html'
        })
        .when('/apply', {
            name:"指向到用户的申请列表",
            controller: 'applyListCtrl',
            controllerUrl: './module/apply/apply_list_ctrl.js',
            templateUrl: './module/apply/apply_list_tpl.html'
        })
        .when('/apply/:id', {
            name:"具体申请信息",
            controller: 'applyDetailCtrl',
            controllerUrl: './module/apply/apply_detail_ctrl.js',
            templateUrl: './module/apply/apply_detail_tpl.html'
        })
        .when('/notice', {
            name:"发送到用户的通知列表",
            controller: 'noticeListCtrl',
            controllerUrl: './module/notice/notice_list_ctrl.js',
            templateUrl: './module/notice/notice_list_tpl.html'
        })
        .when('/notice/:id', {
            name:"通知的具体内容",
            controller: 'noticeDetailCtrl',
            controllerUrl: './module/notice/notice_detail_ctrl.js',
            templateUrl: './module/notice/notice_detail_tpl.html'
        })
        .otherwise({
            redirectTo: '/index'
        });
    }]);

    app.run(['$rootScope', '$lazyload', '$window', '$http', '$location',
        function($rootScope, $lazyload, $window, $http, $location, authenticationSvc) {
            //初始化按需加载
            $lazyload.init(app);
            app.register = $lazyload.register;

            // 监听route变化
			$rootScope.$on("$routeChangeSuccess", function(authenticationSvc) {
				//alert(authenticationSvc.getUserInfo());
			});

			// $rootScope.$on("$routeChangeError", function(event, current, previous, eventObj) {
			// 	if (eventObj.authenticated === false) {
			// 		$location.path("/login");
			// 	}
			// });
        }
    ]);

    module.exports = app;
});
