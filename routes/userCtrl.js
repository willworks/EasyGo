var express = require('express');
var router = express.Router();

router.route('/user').get(function(req,res){
    res.render('index', { title: 'user' });
    var user = global.dbConn.getModel('user');
    user.create({ 
        name: 'user',
    }); 
});

module.exports = router;
