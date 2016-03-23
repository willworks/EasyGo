'use strict';

/**
 * 过滤不存在的数据
 */
define(function(require, exports, module) {

    var filter = angular.module('filter', []);

    filter.filter('filter', function(){
        return function(items){
            angular.forEach(items,function(item, i){
                //item = i+'、'+ item + '===';
                console.log(item.recipient_id);
                //items[i] = item;
            });
            return items;
        }
    });

    module.exports = filter;

})
