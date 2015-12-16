var express = require('express');
var router = express.Router();

router.route('/notice').get(function(req,res){    // 到达此路径则渲染register文件，并传出title值供 register.html使用
	res.render('index', { title: 'notice' });
	var notice = global.dbHandel.getModel('notice'); 
	notice.create({ 							// 创建一组user对象置入model
		name: 'notice',
	}); 
});

module.exports = router;
