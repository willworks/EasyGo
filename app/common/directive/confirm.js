'use strict';

/**
 * confirm弹窗
 */
define(function(require, exports, module) {

    var confirm = angular.module('confirm', []);

    confirm.directive('confirm', function($http, $q, $window) {

    	// Runs during compile
    	return {
    		scope: {
    			confirmOpen : '=',
                certain : '=confirmResult'
    		}, 
    		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
    		templateUrl: 'common/directive/confirm.html',
    		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    		link: function($scope, iElm, iAttrs, controller) {
    			$scope.title = iAttrs.confirmTitle;
    			$scope.content = iAttrs.confirmContent;

    			$scope.cancle = function () {
    				$scope.confirmOpen = false;
    			}

    		}
    	};

    });

    module.exports = confirm;

})

