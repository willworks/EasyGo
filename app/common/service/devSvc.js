'use strict';

/**
 * 添加数据
 */
define(function(require, exports, module) {

    var devSvc = angular.module('devSvc', []);

    devSvc.factory('devSvc', ['$http', '$q', '$window', function($http, $q, $window) {
        return {
            add : function(resource, data) {
                var url = 'api/v1.0/' + resource + '/add';
                var deferred = $q.defer(); // 声明承诺
                var promise = deferred.promise;
                $http.post(url, data)
                .then(
                    function(res) {
                        switch(res.data.code){
                            case '1' : 
                                deferred.resolve(res);
                                break;
                            default :
                                deferred.reject(res);
                                break;
                        }
                    }, 
                    function(err) {
                        deferred.reject(err);
                    }
                )
                return deferred.promise;
            },
        };
    }]);
    module.exports = devSvc;
})

