var express = require('express');
var router = express.Router();

router.route('/apply').get(function(req,res){
    res.render('index', { title: 'apply' });
    var apply = global.dbConn.getModel('apply');
    apply.create({ 
        name: 'apply',
    }); 
});

module.exports = router;
