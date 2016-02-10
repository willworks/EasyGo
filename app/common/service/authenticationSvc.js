'use strict';

/**
 * 用户登录信息校验
 */
define(function(require, exports, module) {

	module.exports = function(app) {

		app.register.factory('authenticationSvc', function($http, $q, $window) {
			var userInfo;

			function login(uname, upwd) {
				var deferred = $q.defer();

				$http.post("/api/v1.0/login", {
					uname: uname,
					upwd: upwd
				})
				.then(
					function(res) {
						userInfo = {
							uname: res.data.uname
						};
						$window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
						deferred.resolve(userInfo);
					}, 

					function(err) {
						deferred.reject(err);
					}
				);

				return deferred.promise;
			}

			function getUserInfo() {
			    return userInfo;
			}

			return {
				login: login,
				getUserInfo: getUserInfo
			};
		});

	}

})



