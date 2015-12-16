var express = require('express');
var router = express.Router();

router.route('/notice').get(function(req,res){    // 到达此路径则渲染register文件，并传出title值供 register.html使用
	res.render('index', { title: 'notice' });
});

module.exports = router;
