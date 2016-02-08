'use strict';

/**
 * 定义过滤器
 */
define(function(require, exports, module) {

    var filter = angular.module('filter', []);

    filter.filter('time', function(){
    	return function(time){
    		return '现在时间: ' + time;
    	}

    })

    filter.filter('time1', function(){
        return function(timeStr){
            var splite_index = timeStr.indexOf(' ');
            return timeStr.substr(0,splite_index);
        }
    })

    filter.filter('time2', function(){
        return function(timeStr){
            var splite_index = timeStr.indexOf(' ');
            return timeStr.substr(splite_index+1);
        }
    })

    filter.filter('trustHtml', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }])

    module.exports = filter;

})
