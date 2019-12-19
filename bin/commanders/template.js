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
exports.__esModule = true;
var glob = require("glob");
var fsExtra = require('fs-extra');
var path = require("path");
var chalk = require("chalk");
var inquirer = require('inquirer');
function copyTemplate(cmd) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, pageType, pageName, cwd, _b, success_1, path_1, removeD, error_1, _c, success, path;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, condition()];
                case 1:
                    _a = _d.sent(), pageType = _a.pageType, pageName = _a.pageName;
                    console.log(chalk.green("template type ====>  " + pageType));
                    console.log(chalk.green("page name  ====>  " + pageName));
                    cwd = process.cwd();
                    if (!cmd.overrid) return [3 /*break*/, 8];
                    return [4 /*yield*/, getDestinationPath(pageName)];
                case 2:
                    _b = _d.sent(), success_1 = _b.success, path_1 = _b.path;
                    if (!success_1) return [3 /*break*/, 7];
                    console.log(chalk.yellow("destination exit ==> " + path_1 + " "));
                    _d.label = 3;
                case 3:
                    _d.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, fsExtra.removeSync(path_1)];
                case 4:
                    removeD = _d.sent();
                    console.log(chalk.green("remove destination success"));
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _d.sent();
                    console.log(chalk.red("destination remove path err ==> " + error_1 + " "));
                    return [3 /*break*/, 6];
                case 6: return [3 /*break*/, 8];
                case 7:
                    console.log(chalk.green("destination path not exit"));
                    _d.label = 8;
                case 8: return [4 /*yield*/, getTemplatePath(pageType)];
                case 9:
                    _c = _d.sent(), success = _c.success, path = _c.path;
                    if (!success)
                        return [2 /*return*/];
                    if (!fsExtra.pathExistsSync(path)) {
                        console.log(chalk.red("template not exit " + path));
                        return [2 /*return*/];
                    }
                    console.log(chalk.green("template path  " + path));
                    if (fsExtra.pathExistsSync(path)) {
                        try {
                            fsExtra.copySync(path, cwd + ("/" + pageName));
                            console.log(chalk.green("copy success "));
                        }
                        catch (error) {
                            console.log(chalk.red("copy err"));
                            return [2 /*return*/];
                        }
                    }
                    writeReducer(pageName);
                    setPage(pageName);
                    return [2 /*return*/];
            }
        });
    });
}
exports.copyTemplate = copyTemplate;
/** 筛选条件 */
function condition() {
    return __awaiter(this, void 0, void 0, function () {
        var promptList, pageType, promptInput, pageName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promptList = [{
                            type: 'list',
                            name: 'name',
                            message: '请选择需要创建的页面类型',
                            choices: ['page', 'order']
                        }];
                    return [4 /*yield*/, inquirer.prompt(promptList)];
                case 1:
                    pageType = _a.sent();
                    promptInput = [{
                            type: 'input',
                            name: 'name',
                            message: '请输入页面名称'
                        }];
                    return [4 /*yield*/, inquirer.prompt(promptInput)];
                case 2:
                    pageName = _a.sent();
                    return [2 /*return*/, {
                            pageType: pageType.name,
                            pageName: pageName.name
                        }];
            }
        });
    });
}
/** 模板路径 */
function getTemplatePath(type) {
    if (type === void 0) { type = ''; }
    return new Promise(function (resolve, reject) {
        var _type = type ? "/" + type : '';
        var typePath = path.join(__dirname, "../../", "template") + _type;
        console.log(chalk.green("template path " + typePath));
        glob(typePath, {}, function (er, file) {
            if (!file.length) {
                console.log(chalk.red("template path err " + typePath));
            }
            resolve({ success: !!file.length, path: file[0] });
        });
    });
}
/** 拷贝目的路径 */
function getDestinationPath(type) {
    if (type === void 0) { type = ''; }
    return new Promise(function (resolve, reject) {
        var _type = type ? "/" + type : '';
        var path = process.cwd() + _type;
        console.log(chalk.green("destination path " + path));
        glob(path, {}, function (er, file) {
            resolve({ success: !!file.length, path: file[0] });
        });
    });
}
/** 设置全局的redux-config */
function writeReducer(pageName) {
    if (pageName === void 0) { pageName = ''; }
    var _pageName = chartUp(pageName);
    var reducerPath = path.join(__dirname, "../../", "src/redux-config/reducers.ts");
    if (!fsExtra.existsSync(reducerPath)) {
        console.log(chalk.red(' ------> 为解析到', reducerPath));
        return;
    }
    var pagePath = process.cwd() + "/" + pageName;
    var reducerContent = fsExtra.readFileSync(reducerPath, "utf8");
    var reducerArr = reducerContent.split('\n');
    reducerArr.unshift("import " + _pageName + "Reducer from '../" + pagePath.split("src/")[1] + "/reducer'");
    var interfaceIndex = reducerArr.indexOf('export interface IReducers {');
    if (reducerContent === -1) {
        console.log(chalk.red(' ------> reducer 结构有问题，请检查'));
        return;
    }
    reducerArr.splice(interfaceIndex + 1, 0, "    " + _pageName + "Reducer: any,");
    var exportIndex = reducerArr.indexOf('const reducers: IReducers = {');
    if (exportIndex === -1) {
        console.log(chalk.red(' ------> reducer 结构有问题，请检查'));
        return;
    }
    reducerArr.splice(exportIndex + 1, 0, "    " + _pageName + "Reducer: " + _pageName + "Reducer,");
    var reducerStr2 = reducerArr.join('\n');
    console.log(chalk.green(' ==> success \n', reducerStr2));
    fsExtra.writeFileSync(reducerPath, reducerStr2);
}
/** 获取指定字符串之间的字符串 */
function getInnerString(source, prefix, postfix) {
    var encodeReg = function (source) {
        return String(source).replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
    };
    var regexp = new RegExp(encodeReg(prefix) + '.+' + encodeReg(postfix), 'gi');
    var matches = String(source).match(regexp);
    var func = function (elem) {
        return elem.replace(prefix, '').replace(postfix, '');
    };
    var arr = matches.map(func);
    return arr;
}
/**
 * 修改page中的reducer名称
 */
function setPage(pageName) {
    if (pageName === void 0) { pageName = ''; }
    var _pageName = chartUp(pageName);
    var pagePath = process.cwd() + "/" + pageName + "/components/user-info/index.tsx";
    if (!fsExtra.existsSync(pagePath)) {
        console.log(chalk.red(' ------> 未解析到', pagePath));
        return;
    }
    var pageContent = fsExtra.readFileSync(pagePath, "utf8");
    var pageArr = pageContent.split('\n');
    var pageExportStr = '';
    var targetIndex = 0;
    pageArr.forEach(function (item, index) {
        if (item.indexOf('RYConnect') > 0) {
            pageExportStr = item;
            targetIndex = index;
        }
    });
    var targetArr = getInnerString(pageExportStr, "[", "]");
    var targetStr = targetArr[0].split(',')[0];
    pageExportStr = pageExportStr.replace(targetStr, "'" + _pageName + "Reducer'");
    console.log(chalk.green(' ===> pageExportStr', pageExportStr));
    pageArr[targetIndex] = pageExportStr;
    var pageContent2 = pageArr.join('\n');
    fsExtra.writeFileSync(pagePath, pageContent2);
}
function chartUp(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
/**
 *
 * //TODO:  ---->
 *
 *
 *
 */
