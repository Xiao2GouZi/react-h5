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
exports.__esModule = true;
var fsExtra = require('fs-extra');
var path = require('path');
var cheerio = require('cheerio');
// const EvalScripts = require('./eval-dom2');
var Utils = require("./utils");
var default_config_1 = require("./default.config");
var eval_dom_1 = require("./eval-dom");
var pp_1 = require("./pp");
var default_html_1 = require("./default.html");
var resolveDir = function (dir) { return path.join(__dirname, "../../../", dir); };
var resolveCwd = function (dir) { return path.resolve(process.cwd(), dir); };
var currDir = process.cwd();
var DrawPageStructure = /** @class */ (function () {
    function DrawPageStructure(props) {
        var url = props.url, output = props.output, background = props.background, animation = props.animation, rootNode = props.rootNode, header = props.header, device = props.device, headless = props.headless, extraHTTPHeaders = props.extraHTTPHeaders, writePageStructure = props.writePageStructure, includeElement = props.includeElement, init = props.init;
        // let filepath = !output.filepath || path.isAbsolute(output.filepath) ? output.filepath : path.join(currDir, output.filepath);
        this.url = url;
        this.filepath = !output.filepath || path.isAbsolute(output.filepath) ? output.filepath : path.join(currDir, output.filepath);
        this.injectSelector = output.injectSelector || 'body';
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
            Utils.log.error('please provide entry url !', 1);
        }
        // if(!output.filepath) {
        //   log.error('please provide output filepath !', 1); 
        // }
        if (header && Utils.getAgrType(header) !== 'object') {
            Utils.log.error('[header] should be an object !', 1);
        }
        if (this.filepath) {
            if (!fsExtra.existsSync(this.filepath)) {
                Utils.log.error('[output.filepath:404] please provide the output filepath !', 1);
            }
            else {
                var fileStat = fsExtra.statSync(this.filepath);
                if (fileStat.isDirectory()) {
                    this.filepath = path.join(this.filepath, 'index.html');
                    fsExtra.writeFileSync(this.filepath, default_html_1["default"]);
                    this.filepath = this.filepath;
                }
            }
        }
    }
    DrawPageStructure.prototype.generateSkeletonHTML = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var html, agrs, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        html = '';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        agrs = Utils.genArgs.create({
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
                        });
                        agrs.unshift(eval_dom_1["default"]);
                        return [4 /*yield*/, page.evaluate.apply(page, agrs)];
                    case 2:
                        html = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        Utils.log.error('\n[page.evaluate] ' + e_1.message);
                        return [3 /*break*/, 4];
                    case 4: 
                    // await page.screenshot({path: 'example.png'});
                    // let base64 = fsExtra.readFileSync(path.resolve(currDir, '../example.png')).toString('base64');
                    return [2 /*return*/, html];
                }
            });
        });
    };
    DrawPageStructure.prototype.writeToFilepath = function (filepath, html) {
        var fileHTML = fsExtra.readFileSync(filepath);
        var $ = cheerio.load(fileHTML, {
            decodeEntities: false
        });
        $(this.injectSelector).html(html);
        fsExtra.writeFileSync(filepath, $.html('html'));
    };
    DrawPageStructure.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pageUrl, spinner, pp, page, html, userWrite, defaultPage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pageUrl = this.url;
                        spinner = Utils.Spinner('magentaBright');
                        spinner.text = '启动浏览器...';
                        return [4 /*yield*/, pp_1["default"]({
                                device: this.device,
                                headless: this.headless
                            })];
                    case 1:
                        pp = _a.sent();
                        // console.log(' =======> pp', pp)
                        spinner.text = "\u6B63\u5728\u6253\u5F00\u9875\u9762\uFF1A" + pageUrl + "...";
                        return [4 /*yield*/, pp.openPage(pageUrl, this.extraHTTPHeaders)];
                    case 2:
                        page = _a.sent();
                        // console.log(' ======> page', page.evaluate)
                        spinner.text = '正在生成骨架屏...';
                        return [4 /*yield*/, this.generateSkeletonHTML(page)];
                    case 3:
                        html = _a.sent();
                        userWrite = Utils.getAgrType(this.writePageStructure) === 'function';
                        if (userWrite) {
                            this.writePageStructure(html, this.filepath);
                        }
                        if (this.filepath) {
                            this.writeToFilepath(this.filepath, html);
                        }
                        if (!userWrite && !this.filepath) {
                            defaultPage = path.join(currDir, 'index.html');
                            fsExtra.writeFileSync(defaultPage, default_html_1["default"]);
                            this.writeToFilepath(defaultPage, html);
                            this.filepath = defaultPage;
                            spinner.clear();
                            Utils.log.warn("\nskeleton has created in a default page: " + defaultPage);
                        }
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
    var dpsConfFile = resolveCwd(default_config_1["default"].filename);
    if (!fsExtra.existsSync(dpsConfFile)) {
        return Utils.log.error("please run 'dps init' to initialize a config file", 1);
    }
    return require(dpsConfFile);
}
function DpsStatr() {
    var dpsConfig = getDpsconfig();
    console.log(' ======> dpsConfig', dpsConfig);
    new DrawPageStructure(dpsConfig).start();
}
exports["default"] = DpsStatr;
