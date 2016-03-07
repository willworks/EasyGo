"use strict";

define(function(require, exports, module) {

	module.exports = function(app) {

		app.register.directive('popupImg', [ function(){
			// Runs during compile
			return {
				// name: '',
				// priority: 1,
				// terminal: true,
				scope: {
					isPopupShow: '=',
					showPopupImg: '=',
				}, // {} = isolate, true = child, false/undefined = no change
				// controller: function($scope, $element, $attrs, $transclude) {},
				// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
				// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
				// template: '',
				templateUrl: '/common/directive/popupImg.html',
				// replace: true,
				// transclude: true,
				// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
				link: function($scope, iElm, iAttrs, controller) {
					$scope.showPopupImg = function (url,ext) {
						if(!url){
							return;
						}

						iElm.find('img').bind('load',function () {
							this.removeAttribute('width');
							this.removeAttribute('height');

							var ofw = document.documentElement.clientWidth,
								ofh = document.documentElement.clientHeight,
								w = this.width,
								h = this.height;

							if(w >= h && w >= ofw){
								this.width = ofw - 50;
							}else if(h > w && h >= ofh){
								this.height = ofh - 50;
							}
						});


						$scope.isPopupShow = true;
						$scope.imgSrc = url;
					}
				}
			};
		}]);

	}

})


