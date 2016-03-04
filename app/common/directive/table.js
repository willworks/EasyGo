"use strict";

/*
 表格渲染样式
 */
define(function(require, exports, module) {

	var table = angular.module('table', []);

	table.directive('table', [ function(){
		// Runs during compile
		return {
			// // name: '',
			// // priority: 1,
			// // terminal: true,
			// scope: {
			// 	isPopupShow: '=',
			// 	showtable: '=',
			// }, 
			// // {} = isolate, true = child, false/undefined = no change
			// // controller: function($scope, $element, $attrs, $transclude) {},
			// // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			// // restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
			// // template: '',
			// templateUrl: '/common/directive/table.html',
			// // replace: true,
			// // transclude: true,
			// // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			// link: function($scope ,element ,attrs ,controller) {
			// 	$scope.showtable = function (url) {
			// 		$scope.isPopupShow = true;
			// 		$scope.imgSrc = url;
			// 	}
			// }
			

			restrict : 'EA',
	        replace : true,
	        transclude : true,
	        scope : {
	            title : '=expanderTitle'
	        },
	        template : '<div>'
	                 + '<div class="title" ng-click="toggle()">{{title}}</div>'
	                 + '<div class="body" ng-show="showMe" ng-transclude></div>'
	                 + '</div>',
	        link : function(scope, element, attrs) {
	            scope.showMe = false;
	            scope.toggle = function toggle() {
	                scope.showMe = !scope.showMe;
	            }
	        }
		};
	}]);

	module.exports = table;

})


