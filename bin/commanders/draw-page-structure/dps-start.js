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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fsExtra = require('fs-extra');
var path = require('path');
var cheerio = require('cheerio');
var chalk = require('chalk');
var Utils = __importStar(require("./utils"));
var DefConf = __importStar(require("./default.config"));
var eval_dom_1 = __importDefault(require("./eval-dom"));
var pp_1 = __importDefault(require("./pp"));
var resolveDir = function (dir) { return path.join(__dirname, "../../../", dir); };
var resolveCwd = function (dir) { return path.resolve(process.cwd(), dir); };
var currDir = process.cwd();
var DrawPageStructure = /** @class */ (function () {
    function DrawPageStructure(props) {
        var url = props.url, targetFile = props.targetFile, background = props.background, animation = props.animation, rootNode = props.rootNode, header = props.header, device = props.device, headless = props.headless, extraHTTPHeaders = props.extraHTTPHeaders, writePageStructure = props.writePageStructure, includeElement = props.includeElement, init = props.init;
        this.url = url;
        this.filepath = targetFile;
        // this.injectSelector = "app" || 'body';
        this.background = background || '#ecf0f2';
        this.animation = animation || '';
        this.rootNode = rootNode || '';
        this.header = header || '';
        this.device = device;
        this.headless = headless;
        this.extraHTTPHeaders = extraHTTPHeaders;
        this.writePageStructure = writePageStructure;
        this.includeElement = includeElement || function () { };
        this.init = init || function () { };
        if (this.headless === undefined)
            this.headless = true;
        if (!url) {
            console.log(chalk.red('please provide entry url !'));
        }
        if (header && Utils.getAgrType(header) !== 'object') {
            console.log(chalk.red('[header] should be an object !'));
        }
    }
    DrawPageStructure.prototype.generateSkeletonHTML = function (page) {
        return __awaiter(this, void 0, Promise, function () {
            var html, genArgs, agrs, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        html = { css: '', html: {} };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        genArgs = {
                            init: {
                                type: 'function',
                                value: this.init.toString()
                            },
                            includeElement: {
                                type: 'function',
                                value: this.includeElement.toString()
                            },
                            background: {
                                type: 'string',
                                value: this.background
                            },
                            animation: {
                                type: 'string',
                                value: this.animation
                            },
                            rootNode: {
                                type: 'string',
                                value: this.rootNode
                            },
                            header: {
                                type: 'object',
                                value: JSON.stringify(this.header)
                            }
                        };
                        if (Utils.getAgrType(this.rootNode) === 'array') {
                            genArgs.rootNode.value = JSON.stringify(this.rootNode);
                            genArgs.rootNode.type = 'array';
                        }
                        agrs = Utils.genArgs.create(genArgs);
                        agrs.unshift(eval_dom_1.default);
                        return [4 /*yield*/, page.evaluate.apply(page, agrs)];
                    case 2:
                        html = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.log(chalk.red('\n[page.evaluate] ' + e_1.message));
                        return [3 /*break*/, 4];
                    case 4:
                        console.log(' ====> html', html);
                        return [2 /*return*/, html];
                }
            });
        });
    };
    DrawPageStructure.prototype.writeToFilepath = function (filepath, html) {
        try {
            var fileHTML = fsExtra.readFileSync(filepath + "/index.tsx", 'utf-8');
            var start = fileHTML.indexOf('><') + 1;
            var targetHtml = fileHTML.slice(0, start) + "\n" + html + fileHTML.slice(start);
            // console.log(' ====> targetHtml', targetHtml)
            fsExtra.writeFileSync(filepath + "/index.tsx", targetHtml);
            console.log(chalk.green(" write html success"));
        }
        catch (error) {
            console.log(chalk.red(" write html fail " + error));
        }
    };
    DrawPageStructure.prototype.writeCss = function (filepath, css) {
        var walkingPath = path.join(__dirname, "../../", 'walking/structure/index.module.less');
        try {
            var fileCss = fsExtra.readFileSync(walkingPath, 'utf-8');
            fsExtra.writeFileSync(filepath + "/index.module.less", fileCss + css);
            console.log(chalk.green(" write css success"));
        }
        catch (error) {
            console.log(chalk.red(" write css fail"));
        }
    };
    DrawPageStructure.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pageUrl, spinner, pp, page, html, userWrite;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pageUrl = this.url;
                        spinner = Utils.Spinner('magentaBright');
                        spinner.text = '启动浏览器...';
                        return [4 /*yield*/, pp_1.default({
                                device: this.device,
                                headless: this.headless
                            })];
                    case 1:
                        pp = _a.sent();
                        spinner.text = "\u6B63\u5728\u6253\u5F00\u9875\u9762\uFF1A" + pageUrl + "...";
                        return [4 /*yield*/, pp.openPage(pageUrl, this.extraHTTPHeaders)];
                    case 2:
                        page = _a.sent();
                        spinner.text = '正在生成骨架屏...';
                        return [4 /*yield*/, this.generateSkeletonHTML(page)];
                    case 3:
                        html = _a.sent();
                        userWrite = Utils.getAgrType(this.writePageStructure) === 'function';
                        if (userWrite) {
                            this.writePageStructure(html.html, this.filepath);
                        }
                        // console.log(' ====> ', JSON.stringify(Object.keys(html.html)))
                        // console.log(' ====> ', this.filepath)
                        Object.keys(html.html).forEach(function (item) {
                            var _item = item.replace("#", "");
                            /** 把默认文件copy指定目录 */
                            var walkingPath = path.join(__dirname, "../../", 'walking/structure');
                            try {
                                var _targetFile = _this.filepath + "/" + _item;
                                if (!fsExtra.existsSync(_targetFile)) {
                                    console.log(chalk.yellow(" target file path:404 [" + _targetFile + "]"));
                                    console.log(chalk.green(" target file path create ..."));
                                    fsExtra.ensureDirSync(_targetFile);
                                    console.log(chalk.green(" target file path create success"));
                                }
                                console.log(chalk.green(" copy file start"));
                                fsExtra.copySync(walkingPath + "/", _targetFile);
                                console.log(chalk.green(" copy file start success"));
                                _this.writeToFilepath(_targetFile, html.html[item]);
                                _this.writeCss(_targetFile, html.css);
                            }
                            catch (error) {
                                console.log(chalk.red("copy walking structure err " + error));
                            }
                        });
                        spinner.clear().succeed("skeleton screen has created and output to " + Utils.calcText(this.filepath));
                        if (!this.headless) return [3 /*break*/, 5];
                        return [4 /*yield*/, pp.browser.close()];
                    case 4:
                        _a.sent();
                        process.exit(0);
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return DrawPageStructure;
}());
function getDpsconfig() {
    var dpsConfFile = resolveDir(DefConf.filename);
    console.log(' =====> ', dpsConfFile);
    if (!fsExtra.existsSync(dpsConfFile)) {
        return console.log(chalk.red("please run 'dps init' to initialize a config file"));
    }
    return require(dpsConfFile);
}
function DpsStatr() {
    var dpsConfig = getDpsconfig();
    console.log(chalk.green(" dps defalut config"), dpsConfig);
    var targetFile = resolveCwd('components/skeleton');
    try {
        if (!fsExtra.existsSync(targetFile)) {
            console.log(chalk.yellow(" target file path:404 [" + targetFile + "]"));
            console.log(chalk.green(" target file path create ..."));
            fsExtra.ensureDirSync(targetFile);
            console.log(chalk.green(" target file path create success"));
        }
        if (!fsExtra.statSync(targetFile).isDirectory()) {
            console.log(chalk.red(" target file path exist and not directory"));
            return;
        }
    }
    catch (error) {
        console.log(chalk.red(" target file path create fail [" + error + "]"));
    }
    console.log(chalk.green(" target file path [" + targetFile + "]"));
    dpsConfig.targetFile = targetFile;
    new DrawPageStructure(dpsConfig).start();
}
exports.default = DpsStatr;