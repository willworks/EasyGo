var express = require('express');
var router = express.Router();

router.route('/depart').get(function(req,res){
    if(!req.session.user){
        req.session.error = "请先登录";
        res.redirect("/login");
    }
    res.render('index', { title: 'depart' });
    var depart = global.dbConn.getModel('depart');
    depart.create({ 
        name: 'depart',
    }); 
});

module.exports = router;
