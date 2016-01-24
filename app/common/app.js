var app = angular.module('app',['ngRoute']);  
app.config(['$routeProvider',function($routeProvider) {  
    $routeProvider  
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
        // .when('/user', {
        //     name:"查看用户列表",
        //     controller: 'userCtrl',
        //     controllerUrl: './module/user/user_list_ctrl.js',
        //     templateUrl: './module/user/user_list_tpl.html'
        // })
        // .when('/user/:id', {
        //     name:"查看用户详细信息",
        //     controller: 'userCtrl',
        //     controllerUrl: './module/user/user_detail_ctrl.js',
        //     templateUrl: './module/user/user_detail_tpl.html'
        // })
        // .when('/apply', {
        //     name:"指向到用户的申请列表",
        //     controller: 'applyCtrl',
        //     controllerUrl: './module/apply/apply_list_ctrl.js',
        //     templateUrl: './module/apply/apply_list_tpl.html'
        // })
        // .when('/apply/:id', {
        //     name:"具体申请信息",
        //     controller: 'applyCtrl',
        //     controllerUrl: './module/apply/apply_detail_ctrl.js',
        //     templateUrl: './module/apply/apply_detail_tpl.html'
        // })
        // .when('/notice', {
        //     name:"发送到用户的通知列表",
        //     controller: 'noticeCtrl',
        //     controllerUrl: './module/notice/notice_list_ctrl.js',
        //     templateUrl: './module/notice/notice_list_tpl.html'
        // })
        // .when('/notice/:id', {
        //     name:"通知的具体内容",
        //     controller: 'noticeCtrl',
        //     controllerUrl: './module/notice/notice_detail_ctrl.js',
        //     templateUrl: './module/notice/notice_detail_tpl.html'
        // })
        .otherwise({
            redirectTo: '/index'
        });
}]);  