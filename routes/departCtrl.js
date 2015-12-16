var express = require('express');
var router = express.Router();

router.route('/depart').get(function(req,res){    // 到达此路径则渲染register文件，并传出title值供 register.html使用
	res.render('index', { title: 'depart' });
	var depart = global.dbHandel.getModel('depart'); 
	depart.create({ 							// 创建一组user对象置入model
		name: 'depart',
	}); 
});

module.exports = router;
