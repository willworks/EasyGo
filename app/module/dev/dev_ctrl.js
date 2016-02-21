'use strict';

/**
 * 定义登陆控制器
 */
define(function(require, exports, module) {
	
    module.exports = function(app) {
    	
        require('common/service/devSvc');
        
        app.register.controller('devCtrl', function($scope, $http, $rootScope, $location, $log, devSvc) {
            
            // -------------混乱数据区-------------
            $rootScope.title = "Dev Page";
            // -------------混乱数据区-------------

            // 添加用户
            $scope.addUser = function () {
                var data = {
                    name : $scope.user_name,
                    password : $scope.user_password,
                    depart_id : $scope.user_depart_id
                }
                devSvc.add('user',data)
                .then(
                    function(res){
                        $scope.user_infoShow = true;
                        $scope.user_info = '添加成功';
                        $scope.user_infoSuccess = true;
                    },
                    function(err){
                        $scope.user_infoShow = true;
                        $scope.user_info = '失败了，程序猿在奋力为你解决';
                        $scope.user_infoSuccess = false;
                    }
                )
            }

            // 添加部门
            $scope.addDepart = function (){
                var data = {
                    name : $scope.depart_name,
                    leader_id : $scope.depart_leader_id,
                    depart_upper_id : $scope.depart_depart_upper_id
                }
                devSvc.add('depart',data)
                .then(
                    function(res){
                        $scope.depart_infoShow = true;
                        $scope.depart_info = '添加成功';
                        $scope.depart_infoSuccess = true;
                    },
                    function(err){
                        $scope.depart_infoShow = true;
                        $scope.depart_info = '失败了，程序猿在奋力为你解决';
                        $scope.depart_infoSuccess = false;
                    }
                )
            }

            // 添加申请
            $scope.addApply = function (){
                var data = {
                    title : $scope.apply_title,
                    content : $scope.apply_content,
                    recipient_id : $scope.apply_recipient_id
                }
                devSvc.add('apply',data)
                .then(
                    function(res){
                        $scope.apply_infoShow = true;
                        $scope.apply_info = '添加成功';
                        $scope.apply_infoSuccess = true;
                    },
                    function(err){
                        $scope.apply_infoShow = true;
                        $scope.apply_info = '失败了，程序猿在奋力为你解决';
                        $scope.apply_infoSuccess = false;
                    }
                )
            }

            // 添加通知
            $scope.addNotice = function (){
                var data = {
                    title : $scope.notice_title,
                    content : $scope.notice_content,
                    recipient_id : $scope.notice_recipient_id
                }
                devSvc.add('notice',data)
                .then(
                    function(res){
                        $scope.notice_infoShow = true;
                        $scope.notice_info = '添加成功';
                        $scope.notice_infoSuccess = true;
                    },
                    function(err){
                        $scope.notice_infoShow = true;
                        $scope.notice_info = '失败了，程序猿在奋力为你解决';
                        $scope.notice_infoSuccess = false;
                    }
                )
            }



        });
    }
});