var express = require('express');
var router = express.Router();

router.route('/notice').get(function(req,res){
    res.render('index', { title: 'notice' });
    var notice = global.dbConn.getModel('notice');
    notice.create({ 
        name: 'notice',
    }); 
});

module.exports = router;
