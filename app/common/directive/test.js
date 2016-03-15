


'use strict';

/**
 * 用户登录信息校验
 */
define(function(require, exports, module) {

    var test = angular.module('test', []);

    test.directive('test', function($http, $q, $window) {

    	// Runs during compile
    	return {
    		// name: '',
    		// priority: 1,
    		// terminal: true,
    		scope: {
    			url : '=popupUrl',
    			save : '=popupSave',
    			popupOpen : '=',
    			template : '=popupTemplate',
    			data : '=popupData'
    		}, // {} = isolate, true = child, false/undefined = no change
    		// controller: function($scope, $element, $attrs, $transclude) {},
    		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
    		// template: '',
    		templateUrl: 'common/directive/test.html',
    		// replace: true,
    		// transclude: true,
    		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    		link: function($scope, iElm, iAttrs, controller) {
    			$scope.title = iAttrs.popupTitle;
    			$scope.content = iAttrs.popupContent;
    			$scope.notBtns = iAttrs.popupNotBtns;

    			$scope.cancle = function () {
    				$scope.popupOpen = false;
    			}
    		}
    	};


    });

    module.exports = test;

})

