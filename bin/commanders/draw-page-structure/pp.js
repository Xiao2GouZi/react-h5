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
Object.defineProperty(exports, "__esModule", { value: true });
var ppteer = require('puppeteer');
var chalk = require('chalk');
// const { log, getAgrType } = require('./utils');
var Utils = __importStar(require("./utils"));
var devices = {
    mobile: [375, 667, 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'],
    ipad: [1024, 1366, 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1'],
    pc: [1200, 1000, 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1']
};
function pp(_a) {
    var _b = _a.device, device = _b === void 0 ? 'mobile' : _b, _c = _a.headless, headless = _c === void 0 ? true : _c;
    return __awaiter(this, void 0, void 0, function () {
        function openPage(url, extraHTTPHeaders) {
            return __awaiter(this, void 0, void 0, function () {
                var page, deviceSet, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, browser.newPage()];
                        case 1:
                            page = _a.sent();
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 6, , 7]);
                            deviceSet = devices[device];
                            page.setUserAgent(deviceSet[2]);
                            page.setViewport({ width: deviceSet[0], height: deviceSet[1] });
                            page.on('console', function (msg) {
                                console.log('PAGE LOG: console =>', msg.text());
                            });
                            page.on('pagerror', function (msg) {
                                console.log('PAGE LOG: pagerror =>', msg);
                            });
                            page.on('error', function (msg) {
                                console.log('PAGE LOG: error =>', msg);
                            });
                            page.on('request', function (msg) {
                                // console.log('PAGE LOG: request =>', msg)
                            });
                            page.on('response', function (msg) {
                                // console.log('PAGE LOG: response =>', msg)
                            });
                            if (!(extraHTTPHeaders && Utils.getAgrType(extraHTTPHeaders) === 'object')) return [3 /*break*/, 4];
                            return [4 /*yield*/, page.setExtraHTTPHeaders(new Map(Object.entries(extraHTTPHeaders)))];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [4 /*yield*/, page.goto(url, {
                                timeout: 2 * 60 * 1000,
                                waitUntil: 'networkidle0'
                            })];
                        case 5:
                            _a.sent();
                            return [3 /*break*/, 7];
                        case 6:
                            e_1 = _a.sent();
                            console.log('\n');
                            console.log(chalk.red("puppeteer err [" + e_1 + "] "));
                            return [3 /*break*/, 7];
                        case 7: return [2 /*return*/, page];
                    }
                });
            });
        }
        var browser;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, ppteer.launch({ headless: headless })];
                case 1:
                    browser = _d.sent();
                    return [2 /*return*/, {
                            browser: browser,
                            openPage: openPage
                        }];
            }
        });
    });
}
exports.default = pp;
;
// const ppteer = require('puppeteer');
// // const { log, getAgrType } = require('./utils');
// // const insertBtn = require('../insertBtn');
// import * as Utils from './utils'
// const devices = {
//   mobile: [375, 667, 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'],
//   ipad: [1024, 1366, 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1'],
//   pc: [1200, 1000, 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1']
// };
// export default async function pp({device = 'mobile', headless = true, showInitiativeBtn = false}) {
//   const browser = await ppteer.launch({headless});//返回browser实例
//   async function openPage(url, extraHTTPHeaders) {
//     const page = await browser.newPage();
//     let timeHandle = null;
//    if(showInitiativeBtn){
//     browser.on('targetchanged', async ()=>{//监听页面路由变化，并获取当前标签页的最新的页面，在showInitiativeBtn为true时插入按钮由开发控制主动生成骨架屏
//       const targets = await browser.targets();
//       const currentTarget = targets[targets.length - 1]
//       const currentPage = await currentTarget.page();
//       clearTimeout(timeHandle)
//       setTimeout(()=>{
//         if(currentPage){
// //           currentPage.evaluate(insertBtn);
//         }
//       },300)
//     })
//    }
//     try{
//       let deviceSet = devices[device];
//       page.setUserAgent(deviceSet[2]);
//       page.setViewport({width: deviceSet[0], height: deviceSet[1]});
//       if(extraHTTPHeaders && Utils.getAgrType(extraHTTPHeaders) === 'object') {
//         await page.setExtraHTTPHeaders(new Map(Object.entries(extraHTTPHeaders)));
//       }
//       await page.goto(url, {
//         waitUntil: 'networkidle0'//不再有网络连接时触发（至少500ms后）
//       });
//     }catch(e){
//       console.log('\n');
//       Utils.log.error(e.message);
//     }
//     return page;
//   }
//   return {
//     browser,
//     openPage
//   }
// };