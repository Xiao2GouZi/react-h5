#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var path = require("path");
var fsExtra = require('fs-extra');
var inquirer = require('inquirer');
var _ = require('loadsh');
var os = require('os');
var homedir = os.homedir();
var resolve = function (dir) { return path.join(__dirname, "../../", dir); };
// 项目中build路径
var buildPath = resolve("build/");
// nginx config配置的路径
var nginxPath = homedir + "/Desktop/nginx/";
function buildNginx(cwd) {
    return __awaiter(this, void 0, void 0, function () {
        var _projectName, _a, success, projectName, _b, success, projectName;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    /** 桌面没有, 直接创建 */
                    if (!fsExtra.existsSync(nginxPath)) {
                        fsExtra.mkdirpSync(nginxPath);
                    }
                    _projectName = '';
                    if (!cwd.init) return [3 /*break*/, 2];
                    return [4 /*yield*/, initCondition()];
                case 1:
                    _a = _c.sent(), success = _a.success, projectName = _a.projectName;
                    if (!success) {
                        console.log(chalk.red('set nginx project err'));
                        return [2 /*return*/];
                    }
                    console.log(chalk.green('nginx project name', projectName));
                    _projectName = "" + nginxPath + projectName;
                    return [3 /*break*/, 5];
                case 2:
                    if (!cwd.select) return [3 /*break*/, 4];
                    return [4 /*yield*/, selectCondition()];
                case 3:
                    _b = _c.sent(), success = _b.success, projectName = _b.projectName;
                    if (!success) {
                        console.log(chalk.red('set nginx project err'));
                        return [2 /*return*/];
                    }
                    _projectName = "" + nginxPath + projectName;
                    return [3 /*break*/, 5];
                case 4:
                    _projectName = nginxPath + 'demo';
                    _c.label = 5;
                case 5:
                    // 判断是否存在当前build路径，没有直接终止
                    if (!fsExtra.existsSync(buildPath)) {
                        console.log(chalk.red('build not found, please npm run build'));
                        return [2 /*return*/];
                    }
                    // 判断是否存在当前build路径，没有直接终止
                    if (!fsExtra.existsSync(_projectName)) {
                        try {
                            fsExtra.mkdirpSync(_projectName);
                            console.log(chalk.green('create nginx project success', _projectName));
                        }
                        catch (error) {
                            console.log(chalk.red('create nginx project success', _projectName));
                        }
                    }
                    console.log(chalk.green('copy from ===> ', buildPath));
                    console.log(chalk.green('copy to ===> ', _projectName));
                    try {
                        fsExtra.removeSync(_projectName + '*');
                        console.log(chalk.green('remove target file success'));
                    }
                    catch (error) {
                        console.log(chalk.red('remove target file err', error));
                    }
                    try {
                        fsExtra.copySync(buildPath, _projectName);
                        console.log(chalk.green('copy target file success'));
                    }
                    catch (error) {
                        console.log(chalk.red('copy target file err', error));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
/** init nginx project */
function initCondition() {
    return __awaiter(this, void 0, Promise, function () {
        var projectName, promptInput, promptRes, files, promptList, promptS, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    projectName = '';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 9, , 10]);
                    promptInput = [{
                            type: 'input',
                            name: 'name',
                            message: 'please init nginx project name',
                        }];
                    return [4 /*yield*/, inquirer.prompt(promptInput)];
                case 2:
                    promptRes = _a.sent();
                    projectName = promptRes.name;
                    console.log(chalk.green('nginx project name', projectName));
                    files = fsExtra.readdirSync(nginxPath);
                    console.log(chalk.green('nginx project files', files));
                    if (!(_.indexOf(files, projectName) >= 0)) return [3 /*break*/, 7];
                    promptList = [{
                            type: 'list',
                            name: 'name',
                            message: projectName + " \u5DF2\u5728Nginx\u4E2D \u505A\u51FA\u9009\u62E9",
                            choices: ['overrid', 'again']
                        }];
                    return [4 /*yield*/, inquirer.prompt(promptList)];
                case 3:
                    promptS = _a.sent();
                    if (!(promptS.name === 'overrid')) return [3 /*break*/, 4];
                    return [2 /*return*/, { success: true, projectName: projectName }];
                case 4: return [4 /*yield*/, initCondition()];
                case 5: return [2 /*return*/, _a.sent()];
                case 6: return [3 /*break*/, 8];
                case 7: return [2 /*return*/, { success: true, projectName: projectName }];
                case 8: return [3 /*break*/, 10];
                case 9:
                    error_1 = _a.sent();
                    console.log(chalk.green('set nginx project name err', error_1));
                    return [2 /*return*/, { success: false }];
                case 10: return [2 /*return*/];
            }
        });
    });
}
/** select existing project */
function selectCondition() {
    return __awaiter(this, void 0, Promise, function () {
        var files, promptSelectP, setProjectRes, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    files = fsExtra.readdirSync(nginxPath);
                    promptSelectP = [{
                            type: 'list',
                            name: 'name',
                            message: "create nginx project! add -> add new; select -> select existing",
                            choices: files
                        }];
                    return [4 /*yield*/, inquirer.prompt(promptSelectP)];
                case 1:
                    setProjectRes = _a.sent();
                    return [2 /*return*/, { success: true, projectName: setProjectRes.name }];
                case 2:
                    error_2 = _a.sent();
                    return [2 /*return*/, { success: false, projectName: '' }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.default = buildNginx;