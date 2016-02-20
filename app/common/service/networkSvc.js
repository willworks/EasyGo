'use strict';

/**
 * 用户登录信息校验
 */
define(function(require, exports, module) {

    var networkSvc = angular.module('networkSvc', []);

    networkSvc.factory('networkSvc', ['$http', '$q', '$window', function($http, $q, $window) {

        return {

            getList : function(resource) {
                var deferred = $q.defer(); // 声明承诺
                var url = 'api/v1.0/' + resource;
                $http.get(url)
                .then(
                    function(res) {
                        deferred.resolve(res);
                    }, 
                    function(err) {
                        deferred.reject(err);
                    }
                );
                return deferred.promise;
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

