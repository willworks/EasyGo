"use strict";

/*
 表格渲染样式
 */
define(function(require, exports, module) {

	var table = angular.module('table', []);

	table.directive('table', [ function(){
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			scope: {
				isPopupShow: '=',
				showtable: '=',
			}, 
			// {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			template:'<button id="add" class="btn btn-default">增加</button>'+
			                     '<button id="minor" class="btn btn-danger">减少</button>'+
			                     '<div>{{ figureCtrl.temp }}</div>',
			// templateUrl: '/common/directive/table.html',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope ,element ,attrs ,controller) {
				$scope.showtable = function (url) {
					angular.element(document.querySelector('#minor')).on('click',resultCtrl[1].reduceCount);
					angular.element(document.querySelector('#add')).on('click',resultCtrl[0].addCount);

					$scope.isPopupShow = true;
					$scope.imgSrc = url;
					console.log(123);
				}
			}
		};
	}]);

	module.exports = table;

})


