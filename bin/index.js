#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var index_1 = require("./commanders/index");
var commander = require('commander');
/** 创建模板 */
commander.command('copy:tpl')
    .option('-o, --overrid', 'overrid page')
    .action(index_1.Template);
commander.parse(process.argv);
