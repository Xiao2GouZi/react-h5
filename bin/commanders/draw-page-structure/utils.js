#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var chalk = require('chalk');
var ora = require('ora');
var emoji = require('node-emoji');
exports.emoji = emoji;
var appName = "dps";
var likeLinux = process.env.TERM === 'cygwin' || process.platform !== 'win32';
var genArgs = {
    // {name: {type, value}}
    // appName-name-type:value
    prefixName: appName + "-",
    create: function (args) {
        var _this = this;
        if (getAgrType(args) !== 'object')
            return;
        return Object.keys(args).map(function (item) {
            var _a = args[item], type = _a.type, value = _a.value;
            return _this.prefixName + item + "-" + type + ":" + value;
        });
    }
};
exports.genArgs = genArgs;
function calcText(str) {
    if (str.length > 40) {
        return str.slice(0, 15) + '...' + (str.match(/([\/\\][^\/\\]+)$/) || ['', ''])[1];
    }
    return str;
}
exports.calcText = calcText;
function log(msg) {
    console.log.apply(console, arguments);
}
exports.log = log;
log.error = function (msg, exit) {
    if (exit === void 0) { exit = 0; }
    log(chalk.gray("[" + appName + "]:", chalk.red(msg)));
    exit && process.exit(0);
};
log.warn = function (msg) {
    log(chalk.yellow(msg));
};
log.info = function (msg) {
    log(chalk.greenBright(msg));
};
function getAgrType(agr) {
    return Object.prototype.toString.call(agr).split(/\s/)[1].slice(0, -1).toLowerCase();
}
exports.getAgrType = getAgrType;
function Spinner(color) {
    var opt = likeLinux ? {
        spinner: {
            "interval": 125,
            "frames": [
                "∙∙∙",
                "●∙∙",
                "∙●∙",
                "∙∙●",
                "∙∙∙"
            ]
        }
    } : '';
    var spinner = ora(opt).start();
    spinner.color = color;
    return spinner;
}
exports.Spinner = Spinner;
var emoji_get = emoji.get.bind(emoji);
emoji.get = function () {
    return !likeLinux ? '·' : emoji_get.apply(emoji, arguments);
};
// exports.log = log;
// exports.calcText = calcText;
// exports.getAgrType = getAgrType;
// exports.Spinner = Spinner;
// exports.emoji = emoji;
// exports.genArgs = genArgs;
