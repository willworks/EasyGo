/**
 * 程序主入口
 */
define(function(require, exports, module) {

    // require('common/app_config');
    // require('common/service/util');
    // require('common/filter/filter');
    // require('file-upload');

    var app = angular.module('app', ['ngRoute']);

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
            templateUrl: './module/index/index_tpl.html'
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

    app.run(['$rootScope', '$window', '$http',
        function($rootScope, $window, $http) {
            // //初始化按需加载
            // app.register = $lazyload.register;

            // 点击body事件
            $rootScope.clickBody = function(){
                $rootScope.$broadcast('clickBody');
            }

            // 滚动事件
            jQuery(window).scroll(function(){
                $rootScope.$broadcast('scroll');
            });
        }
    ]);

    module.exports = app;
});
