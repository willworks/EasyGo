'use strict';

/**
 * 请求方法封装
 */
define(function(require, exports, module) {
    
    module.exports = function(app) {

        app.register.factory('networkSvc', function($http) {

            function getList(resource) {
                var url = 'api/v1.0/' + resource;
                console.log(url);
                $http.get(url)
                .success(function(data){
                    alert(data.msg);
                });
            }

            function getDeatil(resource, resource_id) {
                var url = 'api/v1.0/' + resource + '/' + resource_id;
                console.log(url);
                $http.get(url)
                .success(function(data){
                    alert(data.msg);
                });
            }

            return {
                getList : getList,
                getDeatil : getDeatil
            };
        });

    }

})


