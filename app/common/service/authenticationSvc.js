'use strict';

/**
 * 用户登录信息校验
 */
define(function(require, exports, module) {

    var authenticationSvc = angular.module('authenticationSvc', []);

    authenticationSvc.factory('authenticationSvc', ['$http', '$q', '$window', function($http, $q, $window) {

    	var userInfo;

    	// 防止刷新的时候服务将会失去现有状态
    	// sessionStorage仅仅在当前会话/窗口有效，而localStorage则可以跟cookie一样，但是区别在于cookie会在客户端和服务器来回传递而stroage不会
		function init() {
			if ($window.localStorage["userInfo"]) {
				userInfo = JSON.parse($window.localStorage["userInfo"]);
			}
		}
        init();

        return {

        	login : function(uname, upwd) {
        		var deferred = $q.defer(); // 声明承诺
        		$http.post("/api/v1.0/login", {
        			uname: uname,
        			upwd: upwd
        		})
        		.then(
        			function(res) {
        				userInfo = {
        					uname: res.data.data.uname
        				};
        				$window.localStorage["userInfo"] = JSON.stringify(userInfo);
        				deferred.resolve(res);
        			}, 
        			function(err) {
        				deferred.reject(err);
        			}
        		);
        		return deferred.promise;
        	},

			logout : function() {
				var deferred = $q.defer();
				$http.get("/api/v1.0/logout")
                .then(
					function(res) {
						$window.localStorage["userInfo"] = null;
						userInfo = null;
						deferred.resolve(res);
					}, 
					function(err) {
						deferred.reject(err);
					}
				);
				return deferred.promise;
			},

        	getUserInfo : function() {
        	    return userInfo;
        	}

        };


    }]);

    module.exports = authenticationSvc;

})

