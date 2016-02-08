'use strict';

/**
 * 用户登录信息校验
 */
define(function(require, exports, module) {

	module.exports = function(app) {

		app.factory("authenticationSvc", function($http, $q, $window) {
			var userInfo;

			function login(userName, password) {
				var deferred = $q.defer();

				$http.post("/api/login", {
					userName: userName,
					password: password
				})
				.then(
				function(res) {
					userInfo = {
						accessToken: res.data.access_token,
						userName: res.data.userName
					};
					$window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
					deferred.resolve(userInfo);
				}, 
				
				function(err) {
					deferred.reject(err);
				});

				return deferred.promise;
			}

			return {
				login: login
			};
		});

	}

})



