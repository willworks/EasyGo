define(function (require,exports,module) {
	module.exports = function (app) {
		app.register.directive('popup', function($rootScope){
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
				templateUrl: 'common/directive/popup.html',
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
	}
});
