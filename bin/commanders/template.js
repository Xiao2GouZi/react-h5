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
var _ = require('loadsh');
var resolve = function (dir) { return path.join(__dirname, "../../", dir); };
/** 全局配置的reducer */
var reducerPath = resolve("src/redux-config/reducers.ts");
var templatePath = resolve("template");
function template(cwd) {
    if (cwd.page) {
        templatePage();
    }
    if (cwd.component) {
        templateComponent();
    }
}
/**
*  create template page
*/
function templatePage() {
    return __awaiter(this, void 0, void 0, function () {
        var pageName, pageType, reducerName, pageConditionRes, destinationRes, error_1, _a, success, path, cwd;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    pageName = '';
                    pageType = '';
                    return [4 /*yield*/, pageCondition()];
                case 1:
                    pageConditionRes = _b.sent();
                    if (!pageConditionRes.success)
                        return [2 /*return*/];
                    pageName = pageConditionRes.param.pageName;
                    pageType = pageConditionRes.param.pageType;
                    reducerName = pageConditionRes.param.reducerName;
                    console.log(chalk.green("template type ====> " + pageType));
                    console.log(chalk.green("page name ====> " + pageName));
                    console.log(chalk.green("reducer name ====> " + reducerName));
                    return [4 /*yield*/, getDestinationPath(pageName)];
                case 2:
                    destinationRes = _b.sent();
                    if (!destinationRes.success) return [3 /*break*/, 7];
                    console.log(chalk.yellow("destination exit ==> " + destinationRes.path + " "));
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, fsExtra.removeSync(destinationRes.path)];
                case 4:
                    _b.sent();
                    console.log(chalk.green("remove destination success"));
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _b.sent();
                    console.log(chalk.red("destination remove path err ==> " + error_1 + " "));
                    return [3 /*break*/, 6];
                case 6: return [3 /*break*/, 8];
                case 7:
                    console.log(chalk.green("destination path not exit"));
                    _b.label = 8;
                case 8: return [4 /*yield*/, getTemplatePath(pageType)];
                case 9:
                    _a = _b.sent(), success = _a.success, path = _a.path;
                    if (!success)
                        return [2 /*return*/];
                    if (!fsExtra.pathExistsSync(path)) {
                        console.log(chalk.red("template not exit " + path));
                        return [2 /*return*/];
                    }
                    console.log(chalk.green("template path " + path));
                    try {
                        cwd = process.cwd();
                        fsExtra.copySync(path, cwd + ("/" + pageName));
                        console.log(chalk.green("copy success "));
                    }
                    catch (error) {
                        console.log(chalk.red("copy err"));
                    }
                    writeReducer(pageName, reducerName);
                    setPage(pageName, reducerName);
                    return [2 /*return*/];
            }
        });
    });
}
/** 筛选条件 */
function pageCondition() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, success, path, files, promptList, pageType, pageName, reducers, selectReducer, promptReducer, reducerName, reducerObj, custReducer, name_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getTemplatePath()];
                case 1:
                    _a = _b.sent(), success = _a.success, path = _a.path;
                    if (!success) {
                        console.log(chalk.red("template ====> fail"));
                        return [2 /*return*/, { success: false }];
                    }
                    console.log(chalk.green("template path ====> " + path));
                    files = fsExtra.readdirSync(path);
                    console.log(chalk.green("template type ====>", files));
                    files = _.remove(files, function (item) { return item !== 'component'; });
                    promptList = [{
                            type: 'list',
                            name: 'name',
                            message: '请选择需要创建的页面类型',
                            choices: files
                        }];
                    return [4 /*yield*/, inquirer.prompt(promptList)];
                case 2:
                    pageType = _b.sent();
                    return [4 /*yield*/, setPageName()];
                case 3:
                    pageName = _b.sent();
                    reducers = getReducer();
                    console.log(chalk.green("reducers ====>", reducers));
                    selectReducer = _.concat(reducers, ['custom']);
                    promptReducer = [{
                            type: 'checkbox',
                            name: 'name',
                            message: '请选择需要绑定的reducer',
                            choices: selectReducer,
                            validate: function (value) {
                                console.log(' =======> value', value);
                                return true;
                            }
                        }];
                    return [4 /*yield*/, inquirer.prompt(promptReducer)];
                case 4:
                    reducerObj = _b.sent();
                    if (!reducerObj.name.length) {
                        console.log(chalk.red("\u8BF7\u8BBE\u7F6Ereducer name"));
                        return [2 /*return*/, {
                                success: false
                            }];
                    }
                    reducerName = _.map(reducerObj.name, function (item) {
                        return {
                            key: item === 'custom',
                            value: item
                        };
                    });
                    custReducer = _.filter(reducerName, function (item) { return item.key; });
                    if (!custReducer.length) return [3 /*break*/, 6];
                    return [4 /*yield*/, setReducerName(reducers)];
                case 5:
                    name_1 = _b.sent();
                    _.forEach(reducerName, function (item) {
                        if (item.key) {
                            item.value = name_1;
                        }
                    });
                    _b.label = 6;
                case 6: return [2 /*return*/, {
                        success: true,
                        param: {
                            pageType: pageType.name,
                            pageName: pageName,
                            reducerName: reducerName
                        }
                    }];
            }
        });
    });
}
/** set page name */
function setPageName() {
    return __awaiter(this, void 0, void 0, function () {
        var promptInput, pageName, promptList, pageNameS;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promptInput = [{
                            type: 'input',
                            name: 'name',
                            message: '请输入页面名称'
                        }];
                    return [4 /*yield*/, inquirer.prompt(promptInput)];
                case 1:
                    pageName = _a.sent();
                    if (!fsExtra.pathExistsSync(process.cwd() + "/" + pageName.name)) return [3 /*break*/, 6];
                    promptList = [{
                            type: 'list',
                            name: 'name',
                            message: '该路径下页面已经存在，请选择如何操作。 again: 重新输入; continue: 删除存在的，创建新的',
                            choices: ['again', 'continue']
                        }];
                    return [4 /*yield*/, inquirer.prompt(promptList)];
                case 2:
                    pageNameS = _a.sent();
                    console.log(' ===> ', pageNameS);
                    if (!(pageNameS.name === 'again')) return [3 /*break*/, 4];
                    return [4 /*yield*/, setPageName()];
                case 3: return [2 /*return*/, _a.sent()];
                case 4:
                    if (pageNameS.name === 'continue') {
                        return [2 /*return*/, pageName.name];
                    }
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6: return [2 /*return*/, pageName.name];
                case 7: return [2 /*return*/];
            }
        });
    });
}
/** set reducer name */
function setReducerName(reducers) {
    return __awaiter(this, void 0, void 0, function () {
        var promptInputReducer, reducername, promptAffirm, affirm;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promptInputReducer = [{
                            type: 'input',
                            name: 'name',
                            message: '请输入reducer名称 eg. xxxReducer 首字母大写, 驼峰,添加Reducer',
                            filter: function (value) {
                                var _value = chartUp(value);
                                return _value.indexOf('Reducer') >= 0 ? _value : _value + "Reducer";
                            }
                        }];
                    return [4 /*yield*/, inquirer.prompt(promptInputReducer)];
                case 1:
                    reducername = _a.sent();
                    if (!(_.indexOf(reducers, reducername.name) >= 0)) return [3 /*break*/, 5];
                    promptAffirm = {
                        type: "confirm",
                        message: "已存在reducers中，是否重新输入",
                        name: "name"
                    };
                    return [4 /*yield*/, inquirer.prompt(promptAffirm)];
                case 2:
                    affirm = _a.sent();
                    if (!affirm.name) return [3 /*break*/, 4];
                    return [4 /*yield*/, setReducerName(reducers)];
                case 3: return [2 /*return*/, _a.sent()];
                case 4: return [2 /*return*/, reducername.name];
                case 5: return [2 /*return*/, reducername.name];
            }
        });
    });
}
/** 模板路径 */
function getTemplatePath(type) {
    if (type === void 0) { type = ''; }
    return new Promise(function (resolve, reject) {
        var _type = type ? "/" + type : '';
        var typePath = templatePath + _type;
        // console.log(chalk.green(`template path =====> ${typePath}`))
        glob(typePath, {}, function (er, file) {
            if (!file.length) {
                console.log(chalk.red("template path err " + typePath));
            }
            resolve({ success: !!file.length, path: file[0] });
        });
    });
}
/** 拷贝目的路径 */
function getDestinationPath(pageName) {
    if (pageName === void 0) { pageName = ''; }
    return new Promise(function (resolve, reject) {
        var _type = pageName ? "/" + pageName : '';
        var path = process.cwd() + _type;
        console.log(chalk.green("destination path " + path));
        glob(path, {}, function (er, file) {
            resolve({ success: !!file.length, path: file[0] });
        });
    });
}
/** 设置全局的redux-config */
function writeReducer(pageName, reducerName) {
    if (pageName === void 0) { pageName = ''; }
    var custom = _.filter(reducerName, function (item) { return item.key; });
    if (!custom.length) {
        console.log(chalk.yellow("reducer not custom"));
        return;
    }
    var _reducerName = custom[0].value;
    var reducerContent = getReducerContent();
    var reducerArr = reducerContent.split('\n');
    var pagePath = process.cwd() + "/" + pageName;
    reducerArr.unshift("import " + _reducerName + " from '../" + pagePath.split("src/")[1] + "/reducer'");
    var interfaceIndex = reducerArr.indexOf('export interface IReducers {');
    if (reducerContent === -1) {
        console.log(chalk.red(' ------> reducer 结构有问题，请检查'));
        return;
    }
    reducerArr.splice(interfaceIndex + 1, 0, "    " + _reducerName + ": any,");
    var exportIndex = reducerArr.indexOf('const reducers: IReducers = {');
    if (exportIndex === -1) {
        console.log(chalk.red(' ------> reducer 结构有问题，请检查'));
        return;
    }
    reducerArr.splice(exportIndex + 1, 0, "    " + _reducerName + ",");
    var reducerStr2 = reducerArr.join('\n');
    try {
        fsExtra.writeFileSync(reducerPath, reducerStr2);
    }
    catch (error) {
        console.log(chalk.red(' ------> write reducer err', error));
    }
}
/** 获取全局配置的reducer */
function getReducerContent() {
    if (!fsExtra.existsSync(reducerPath)) {
        console.log(chalk.red(' ------> 为解析到', reducerPath));
        return;
    }
    var reducerContent = fsExtra.readFileSync(reducerPath, "utf8");
    return reducerContent;
}
/** 获取项目中所有的reducers */
function getReducer() {
    var reducerContent = getReducerContent();
    var reducerArr = reducerContent.split('\n');
    var start = _.indexOf(reducerArr, "const reducers: IReducers = {");
    var end = _.lastIndexOf(reducerArr, "}");
    var reducerA = _.slice(reducerArr, start + 1, end);
    return reducerA.map(function (item) {
        var _item = item.replace(/\s*/g, "").split(':')[0];
        return _item.replace(',', '');
    });
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
function setPage(pageName, reducerName) {
    if (pageName === void 0) { pageName = ''; }
    var _reducerName = _.map(reducerName, function (item) {
        return "'" + item.value + "'";
    });
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
    pageExportStr = pageExportStr.replace(targetStr, _reducerName.join(', '));
    // console.log(chalk.green(' ===> pageExportStr', pageExportStr))
    pageArr[targetIndex] = pageExportStr;
    var pageContent2 = pageArr.join('\n');
    try {
        fsExtra.writeFileSync(pagePath, pageContent2);
    }
    catch (error) {
        console.log(chalk.red(' ------> set page reducer err', error));
    }
}
/** 首字母大写 */
function chartUp(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
// ------------------------------------------- component -------------------------------------
/**
 * create template component
 */
function templateComponent() {
    return __awaiter(this, void 0, void 0, function () {
        var componentName, reducers, destinationRes, error_2, _a, success, path, cwd;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, setComponentName()];
                case 1:
                    componentName = _b.sent();
                    console.log(chalk.green("component name " + componentName));
                    return [4 /*yield*/, setComponentReducer()];
                case 2:
                    reducers = _b.sent();
                    if (!reducers.success)
                        return [2 /*return*/];
                    console.log(chalk.green("component reducer ", JSON.stringify(reducers.reducerName)));
                    return [4 /*yield*/, getDestinationPath(componentName)];
                case 3:
                    destinationRes = _b.sent();
                    if (!destinationRes.success) return [3 /*break*/, 8];
                    console.log(chalk.yellow("destination exit ==> " + destinationRes.path + " "));
                    _b.label = 4;
                case 4:
                    _b.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, fsExtra.removeSync(destinationRes.path)];
                case 5:
                    _b.sent();
                    console.log(chalk.green("remove destination success"));
                    return [3 /*break*/, 7];
                case 6:
                    error_2 = _b.sent();
                    console.log(chalk.red("destination remove path err ==> " + error_2 + " "));
                    return [3 /*break*/, 7];
                case 7: return [3 /*break*/, 9];
                case 8:
                    console.log(chalk.green("destination path not exit"));
                    _b.label = 9;
                case 9: return [4 /*yield*/, getTemplatePath('component')];
                case 10:
                    _a = _b.sent(), success = _a.success, path = _a.path;
                    if (!success)
                        return [2 /*return*/];
                    if (!fsExtra.pathExistsSync(path)) {
                        console.log(chalk.red("template not exit " + path));
                        return [2 /*return*/];
                    }
                    console.log(chalk.green("template path " + path));
                    try {
                        cwd = process.cwd();
                        fsExtra.copySync(path, cwd + ("/" + componentName));
                        console.log(chalk.green("copy success "));
                    }
                    catch (error) {
                        console.log(chalk.red("copy err"));
                    }
                    setComponent(componentName, reducers.reducerName);
                    return [2 /*return*/];
            }
        });
    });
}
/** set component name */
function setComponentName() {
    return __awaiter(this, void 0, void 0, function () {
        var promptInput, pageNameObj, pageName, promptList, pageNameS;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promptInput = [{
                            type: 'input',
                            name: 'name',
                            message: '请输入component名称'
                        }];
                    return [4 /*yield*/, inquirer.prompt(promptInput)];
                case 1:
                    pageNameObj = _a.sent();
                    pageName = pageNameObj.name;
                    if (!fsExtra.pathExistsSync(process.cwd() + "/" + pageName)) return [3 /*break*/, 6];
                    promptList = [{
                            type: 'list',
                            name: 'name',
                            message: '该路径下component已经存在，请选择如何操作。 again: 重新输入; continue: 删除存在的，创建新的',
                            choices: ['again', 'continue']
                        }];
                    return [4 /*yield*/, inquirer.prompt(promptList)];
                case 2:
                    pageNameS = _a.sent();
                    console.log(' ===> ', pageNameS);
                    if (!(pageNameS.name === 'again')) return [3 /*break*/, 4];
                    return [4 /*yield*/, setComponentName()];
                case 3: return [2 /*return*/, _a.sent()];
                case 4:
                    if (pageNameS.name === 'continue') {
                        return [2 /*return*/, pageName];
                    }
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6: return [2 /*return*/, pageName];
                case 7: return [2 /*return*/];
            }
        });
    });
}
/**  */
function setComponentReducer() {
    return __awaiter(this, void 0, void 0, function () {
        var reducers, promptReducer, reducerName, reducerObj;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reducers = getReducer();
                    console.log(chalk.green("reducers ====>", reducers));
                    promptReducer = [{
                            type: 'checkbox',
                            name: 'name',
                            message: '请选择需要绑定的reducer',
                            choices: reducers,
                            validate: function (value) {
                                console.log(' =======> value', value);
                                return true;
                            }
                        }];
                    return [4 /*yield*/, inquirer.prompt(promptReducer)];
                case 1:
                    reducerObj = _a.sent();
                    if (!reducerObj.name.length) {
                        console.log(chalk.red("\u8BF7\u8BBE\u7F6Ereducer name"));
                        return [2 /*return*/, {
                                success: false
                            }];
                    }
                    reducerName = _.map(reducerObj.name, function (item) {
                        return {
                            key: false,
                            value: item
                        };
                    });
                    return [2 /*return*/, {
                            success: true,
                            reducerName: reducerName
                        }];
            }
        });
    });
}
function setComponent(componentName, reducerNames) {
    var _reducerName = _.map(reducerNames, function (item) {
        return "'" + item.value + "'";
    });
    var pagePath = process.cwd() + "/" + componentName + "/index.tsx";
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
    pageExportStr = pageExportStr.replace(targetStr, _reducerName.join(', '));
    // console.log(chalk.green(' ===> pageExportStr', pageExportStr))
    pageArr[targetIndex] = pageExportStr;
    var pageContent2 = pageArr.join('\n');
    try {
        fsExtra.writeFileSync(pagePath, pageContent2);
    }
    catch (error) {
        console.log(chalk.red(' ------> set component reducer err', error));
    }
}
exports["default"] = template;
/**
*
* //TODO:
*   1. 覆盖 page 的时候, src/redux-config/reduers.ts 中的reducer 需要手动清理
*
*
*/ 
