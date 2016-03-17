'use strict';

/**
 * 用户登录信息校验
 */
define(function(require, exports, module) {

    var networkSvc = angular.module('networkSvc', []);

    networkSvc.factory('networkSvc', ['$http', '$q', '$window', function($http, $q, $window) {

        return {
            // getList & getDeatil 一般返回res.code有-99 0和1，这里处理-99和1，其余算为default

            getList : function(resource, type) {
                var deferred = $q.defer(); // 声明承诺
                var url = 'api/v1.0/' + resource + '/' + type;
                $http.get(url)
                .then(
                    function(res) {
                        deferred.resolve(res);
                    }, 
                    function(err) {
                        deferred.reject(err);
                    },
                    function(proc) {
                        deferred.notify('processing');
                    }
                );
                return deferred.promise;
            },

            getDeatil : function(resource, resource_id) {
                var deferred = $q.defer(); // 声明承诺
                var url = 'api/v1.0/' + resource + '/' + resource_id;
                $http.get(url)
                .then(
                    function(res) {
                        deferred.resolve(res);
                    }, 
                    function(err) {
                        deferred.reject(err);
                    },
                    function(proc) {
                        deferred.notify('processing');
                    }
                );
                return deferred.promise;
            },

            addItem : function(resource, data) {
                var deferred = $q.defer(); // 声明承诺
                var url = 'api/v1.0/' + resource + '/add'; 
                $http.post(url, data)
                .then(
                    function(res) {
                        deferred.resolve(res);
                    }, 
                    function(err) {
                        deferred.reject(err);
                    },
                    function(proc) {
                        deferred.notify('processing');
                    }
                );
                return deferred.promise;
            },

            deleteItem : function(resource, resource_id) {
                var deferred = $q.defer(); // 声明承诺
                var url = 'api/v1.0/' + resource + '/' + resource_id + '/delete';
                $http.delete(url)
                .then(
                    function(res) {
                        deferred.resolve(res);
                    }, 
                    function(err) {
                        deferred.reject(err);
                    },
                    function(proc) {
                        deferred.notify('processing');
                    }
                );
                return deferred.promise;
            }
        };

    }]);

    module.exports = networkSvc;

})

