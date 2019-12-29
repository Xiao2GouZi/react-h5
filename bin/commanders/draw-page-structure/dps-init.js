#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var path = require('path');
var fsExtra = require('fs-extra');
var prompts = require('prompts');
var default_config_1 = require("./default.config");
var Utils = require("./utils");
var resolveDir = function (dir) { return path.join(__dirname, "../../../", dir); };
var resolveCwd = function (dir) { return path.resolve(process.cwd(), dir); };
// const currDir = process.cwd()
function dpsInit() {
    console.log(' ======> currDir');
    var dpsConfFile = resolveCwd(default_config_1["default"].filename);
    if (fsExtra.existsSync(dpsConfFile)) {
        return console.log("\n[" + default_config_1["default"].filename + "] had been created! you can edit it and then run 'dps start'\n");
    }
    askForConfig().then(function (_a) {
        var url = _a.url, filepath = _a.filepath;
        var outputPath = filepath ? resolveCwd(filepath).replace(/\\/g, '\\\\') : '';
        prompts({
            type: 'toggle',
            name: 'value',
            message: "Are you sure to create skeleton screen base on " + url + ". \n and will output to " + Utils.calcText(outputPath),
            initial: true,
            active: 'Yes',
            inactive: 'no'
        }).then(function (res) {
            if (res.value) {
                fsExtra.writeFile(resolveCwd(default_config_1["default"].filename), default_config_1["default"].getTemplate({
                    url: url,
                    filepath: outputPath
                }), function (err) {
                    if (err)
                        throw err;
                    console.log("\n[" + default_config_1["default"].filename + "] had been created! now, you can edit it and then run 'dps start'\n");
                });
            }
        });
    });
}
function askForConfig() {
    var questions = [
        {
            type: 'text',
            name: 'url',
            message: "What's your page url ?",
            validate: function (value) {
                var urlReg = /^https?:\/\/.+/ig;
                if (urlReg.test(value)) {
                    return true;
                }
                return 'Please enter a valid url';
            }
        },
        {
            type: 'text',
            name: 'filepath',
            message: "Enter a relative output filepath ? (optional)",
            validate: function (value) {
                var filepath = path.isAbsolute(value) ? value : resolveDir(value);
                console.log(' =====> filepath', filepath);
                var exists = fsExtra.existsSync(filepath);
                if (value && !exists) {
                    return 'Please enter a exists target';
                }
                return true;
            }
        }
    ];
    return prompts(questions);
}
exports["default"] = dpsInit;
