/** 
    Document   : EasyGo
    Created on : 2015.10
    Author     : Kevin Zhong
    License    : MIT
    github     : https://github.com/willworks/EasyGo
    Description: EasyGo is a co-working-system for office approval
    Copyright (c) 2015 Kevin Zhong
*/
var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    routes = require('./routes/routes'),
    middlewares = require('./routes/middlewares');

// 数据模型
global.dbConn = require('./models/dbConn');
global.db = mongoose.connect("mongodb://localhost:27017/EasyGo");

// __dirname为当前命令所在路径
global.root = __dirname;

// 所有请求会先经过中间件app.use处理，再传到路由app.http-verb等，next()用于确保请求进入下个路由
middlewares(app);

// 自定义路由入口文件
routes(app);

module.exports = app;
