var app = angular.module('app',['ngRoute']);  
app.config(['$routeProvider',function ($routeProvider) {  
    $routeProvider  
        .when('/', {  
            name: "首页",
            controller: 'IndexCtrl',
            controllerUrl: '/module/index/index_ctrl.js',
            templateUrl: '/module/index/index_tpl.html'
        })  
        .when('/list/:id', {  
            name: "首页",
            controller: 'IndexCtrl',
            controllerUrl: '/module/index/index_ctrl.js',
            templateUrl: '/module/index/index_tpl.html'
        })  
        .otherwise({  
            name: "404",
            controller: '404',
            controllerUrl: '/module/index/index_ctrl.js',
            templateUrl: '/module/index/index_tpl.html'
        });  
}]);  