'use strict';

define(function(require, exports, module) {

    var util = angular.module('util', []);

    util.factory('util', ['$http', '$q',
        // function test() {
        // 	var a = 2;
        //     return a;
        // }

        function($http, $q) {
            var config = {

            };

            return {

                test : function () {
                    var a = 2;
                    return a;
                }

            };
        }
    ]);



    module.exports = util;

})


