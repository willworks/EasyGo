/**
 * 定义首页控制器
 */
define(function(require, exports, module) {

	module.exports = function(app) {

		// require('common/directive/timepicker')(app);
  //       require('common/directive/crumb')(app);
  //       require('common/directive/popup')(app);
  //       require('common/directive/popupImg')(app);
  //       require('common/service/index')(app);
  //       require('common/service/special')(app);
  //       require('bower_component/jquery-ui/themes/smoothness/jquery-ui.min.css');
  //       require('bower_component/jqueryui-timepicker-addon/dist/jquery-ui-timepicker-addon.min.css');

		app.register.controller('indexCtrl', ['$scope', '$http', '$rootScope'){
            $rootScope.title = "Home Page";
		}]);
	}
})
