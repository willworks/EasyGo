'use strict';

/**
 * 用户登录信息校验
 */
define(function(require, exports, module) {

    var networkSvc = angular.module('networkSvc', []);

    networkSvc.factory('networkSvc', ['$http', '$q', '$window', function($http, $q, $window) {

        var userInfo;

        return {
            
            getLogin : function(uname, upwd){
                $http.post("/api/v1.0/login", {
                    uname: uname,
                    upwd: upwd
                })
                .success(function(data){
                    // 登陆成功之后服务端会返回uname(token)
                    alert(data.data.uname);
                });
            },

            getList : function(resource) {
                var url = 'api/v1.0/' + resource;
                console.log(url);
                $http.get(url)
                .success(function(data){
                    alert(data.msg);
                });
            },

            getDeatil : function(resource, resource_id) {
                var url = 'api/v1.0/' + resource + '/' + resource_id;
                console.log(url);
                $http.get(url)
                .success(function(data){
                    alert(data.msg);
                });
            }

        };

    }]);

    module.exports = networkSvc;

})

