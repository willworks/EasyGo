var app = angular.module('app',['ngRoute', 'mgcrea.ngStrap']);  
app.config(['$routeProvider',function ($routeProvider) {  
    $routeProvider  
        .when('/', {  
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
        .when('/list/:id', {  
            name: "首页",
            redirectTo: '/list'
        })  
        .when('/404', {  
            name: "404",
            controller: '404Ctrl',
            controllerUrl: '/module/404/404_ctrl.js',
            templateUrl: './module/404/404_tpl.html'
        })
        .otherwise({  
            name: "404",
            controller: '404Ctrl',
            controllerUrl: '/module/404/404_ctrl.js',
            templateUrl: './module/404/404_tpl.html'
        });  
}]);  