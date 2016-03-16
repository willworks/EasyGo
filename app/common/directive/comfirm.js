'use strict';

/**
 * comfirm弹窗
 */
define(function(require, exports, module) {

    var comfirm = angular.module('comfirm', []);

    comfirm.directive('comfirm', function($http, $q, $window) {

    	// Runs during compile
    	return {
    		scope: {
    			url : '=popupUrl',
    			save : '=popupSave',
    			popupOpen : '=',
    			data : '=popupData'
    		}, 
    		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
    		templateUrl: 'common/directive/comfirm.html',
    		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    		link: function($scope, iElm, iAttrs, controller) {
    			$scope.title = iAttrs.popupTitle;
    			$scope.content = iAttrs.popupContent;

    			$scope.cancle = function () {
    				$scope.popupOpen = false;
                    //alert('cancle');
    			}

                $scope.certain = function () {
                    $scope.popupOpen = false;
                    //alert('certain');
                }
    		}
    	};

    });

    module.exports = comfirm;

})

