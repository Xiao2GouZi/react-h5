#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./commanders/index");
var commander = require('commander');
/**
 * 创建模板
 *
 * create page
 * ry tpl -p
 *
 * create component
 * ry tpl -c
 *
 * */
commander.command('tpl')
    .option('-p, --page', 'init page')
    .option('-c, --component', 'init component')
    .action(index_1.Template);
/**
 * build nginx
 *
 * 创建demo project
 * ry build:nginx
 *
 * 创建新的 nginx project
 * ry build:nginx -i
 *
 * 选择已有的 nginx project
 * ry build:nginx -s
 *
 */
commander.command('build:nginx')
    .option('-i, --init', 'init nginx project')
    .option('-s, --select', 'select existing nginx project')
    .action(index_1.BuildNginx);
/**
 * show qrcode
 *
 * ry qrcode
 *
 * */
commander.command('qrcode')
    .action(index_1.Qrcode);
/**
 * 创建 自动生成骨架屏 config.js文件
 * */
commander
    .command('dps:init')
    .description('create a default dps.config.js file')
    .action(index_1.DpsInit);
/**
 * 创建骨架屏
 */
commander
    .command('dps:start')
    .description('start create a skeleton screen')
    .action(index_1.DpsStart);
commander.parse(process.argv);