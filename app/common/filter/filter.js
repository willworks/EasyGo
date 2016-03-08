'use strict';

/**
 * 定义过滤器
 */
define(function(require, exports, module) {

    var filter = angular.module('filter', []);

    filter.filter('filter', function(){
        return {
            time : function(items){
                angular.forEach(items,function(item, i){
                    item = i+'、'+ item + '===';
                    console.log(item);
                    items[i] = item;
                });
                return items;
            }
        }
    });

    module.exports = filter;

})
