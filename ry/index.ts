#!/usr/bin/env node

import { Template, BuildNginx, Qrcode } from './commanders/index'
const commander = require('commander');

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
    .action(Template)

/** 
 * build nginx]
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
    .action(BuildNginx)

/** 
 * show qrcode 
 * 
 * ry qrcode
 * 
 * */
commander.command('qrcode')
    .action(Qrcode)


commander.parse(process.argv)
