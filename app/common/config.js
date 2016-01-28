/*
                       seajs配置示例
 //**********************************************************
 seajs.config({
   // 别名配置
   alias: {
     'es5-safe': 'gallery/es5-safe/0.9.3/es5-safe',
     'json': 'gallery/json/1.0.2/json',
     'jquery': 'jquery/jquery/1.10.1/jquery'
   },
   // 路径配置
   paths: {
     'gallery': 'https://a.alipayobjects.com/gallery'
   },
   // 变量配置
   vars: {
     'locale': 'zh-cn'
   },
   // 映射配置
   map: [
     ['http://example.com/js/app/', 'http://localhost/js/app/']
   ],
   // 预加载项
   preload: [
     Function.prototype.bind ? '' : 'es5-safe',
     this.JSON ? '' : 'json'
   ],
   // 调试模式
   debug: true,
   // Sea.js 的基础路径
   base: 'http://example.com/path/to/base/',
   // 文件编码
   charset: 'utf-8'});
   //**********************************************************
 */

seajs.config({
    base: '/',
    charset: 'utf-8',
    timeout: 20000
});

seajs.use('common/app', function() {
    angular.bootstrap(document, ['app']);
});