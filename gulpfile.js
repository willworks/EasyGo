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
    browserSync = require('browser-sync');//browser-sync服务器刷新

gulp.task('server', function() {
    browserSync({
        files: "**",
        server: {
            baseDir: "./app/"
        }
    });
});

//运行Gulp时，默认的Task
gulp.task('default', ['server']);