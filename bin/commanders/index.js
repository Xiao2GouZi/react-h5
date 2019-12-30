#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var template_1 = __importDefault(require("./template"));
exports.Template = template_1.default;
var build_nginx_1 = __importDefault(require("./build-nginx"));
exports.BuildNginx = build_nginx_1.default;
var qrcode_1 = __importDefault(require("./qrcode"));
exports.Qrcode = qrcode_1.default;
var dps_init_1 = __importDefault(require("./draw-page-structure/dps-init"));
exports.DpsInit = dps_init_1.default;
var dps_start_1 = __importDefault(require("./draw-page-structure/dps-start"));
exports.DpsStart = dps_start_1.default;