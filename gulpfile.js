/**
 * Document   : gulp自动化重载页面
 * Created on : 2015 8
 * Author     : Kevin Zhong
 * License    : MIT
 * github     : https://github.com/willworks 
 * Description: gulp自动化重载页面
 * Copyright (c) 2015 Kevin Zhong
 */

//引入插件
var gulp = require('gulp'),//引入基础库
    tinylr = require('tiny-lr'),//livereload
    server = tinylr(),
    port = 35729,
    livereload = require('gulp-livereload'),//livereload用于浏览器自动刷新
    webserver = require('gulp-webserver');//用于在本地启动Http服务

//创建watch任务去检测html文件,其定义了当html改动之后，去调用一个gulp的Task
//以下三个目录要一致，服务器目录，监测目录和重载目录
gulp.task('watch', function () {
  gulp.watch(['./static/*.html'], ['html']);// 监测目录
});

//使用connect启动一个Web服务器
gulp.task('server', function() {
  gulp.src('./static/')
    .pipe(webserver({
      livereload: true,
      port: 8080, //端口号
      open: true  //自动打开浏览器
    }));
  gulp.start('watch');
});

gulp.task('html', function () {
  gulp.src('./static/*.html') //重新加载目录
  .pipe(livereload(server));
});

//运行Gulp时，默认的Task
gulp.task('default', ['server', 'watch']);