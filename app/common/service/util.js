'use strict';

define(function(require, exports, module) {

    var util = angular.module('util', []);

    util.factory('util', ['$http', '$q',
        function test() {
            alert(214);
        }
    ]);

    module.exports = util;

})


