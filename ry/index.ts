#!/usr/bin/env node

import { Template } from './commanders/index'
const commander = require('commander');


/** 创建模板 */
commander.command('copy:tpl')
    .option('-o, --overrid', 'overrid page')
    .action(Template)


commander.parse(process.argv)
