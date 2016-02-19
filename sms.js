var App = require('alidayu-node');
var app = new App('23312461', 'dcd0bb827c5bb67307a701e724805098');
 
app.smsSend({
    sms_free_sign_name: '注册验证',
    sms_param: {"code": "123456", "product": "测试网站"},
    rec_num: '15625043342',
    sms_template_code: 'SMS_5028179'
});