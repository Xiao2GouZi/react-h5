#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function evalDOM() {
    var ELEMENTS = ['audio', 'button', 'canvas', 'code', 'img', 'input', 'pre', 'svg', 'textarea', 'video', 'xmp'];
    /** 存放标签 */
    var blocks = {};
    var block_key = '';
    var css = '';
    var win_w = window.innerWidth;
    var win_h = window.innerHeight;
    var agrs = arguments;
    if (!agrs.length)
        agrs = { length: 1, 0: {} };
    var agrs0 = agrs[0];
    if (agrs.length !== 1 || getArgtype(agrs0) !== 'object') {
        agrs = parseAgrs(Object.values(agrs));
    }
    var classProps = {
        position: 'fixed',
        zIndex: 999,
        background: agrs.background,
        animation: undefined
    };
    if (agrs.animation) {
        classProps.animation = agrs.animation;
    }
    createCommonClass(classProps);
    function drawBlock(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.width, width = _c === void 0 ? 0 : _c, _d = _b.height, height = _d === void 0 ? 0 : _d, _e = _b.top, top = _e === void 0 ? 0 : _e, _f = _b.left, left = _f === void 0 ? 0 : _f, _g = _b.zIndex, zIndex = _g === void 0 ? 999 : _g, _h = _b.background, background = _h === void 0 ? agrs.background : _h, _j = _b.radius, radius = _j === void 0 ? '' : _j, _k = _b.subClas, subClas = _k === void 0 ? false : _k;
        var styles = ["height: \"" + height + "%\""];
        if (!subClas) {
            styles.push("top: \"" + top + "%\", left: \"" + left + "%\", width: \"" + width + "%\"");
        }
        if (classProps.zIndex !== zIndex) {
            styles.push('zIndex:' + zIndex);
        }
        if (classProps.background !== background) {
            styles.push("backgroundColor: \"" + background + "\"");
        }
        radius && radius != '0px' && styles.push("borderRadius: \"" + radius + "\"");
        // const block_value = blocks[block_key]
        var _html = "<div className=" + (subClas ? "{`${Styles.skeleton_content}`}" : "{`${Styles.skeleton_item}`}") + " style={{" + styles.join(',') + "}}></div>\n";
        console.log(' ===> ');
        blocks[block_key].push(_html);
        // blocks[block_key] = block_value ? block_value.push(_html) : [_html];
    }
    function wPercent(x) {
        return parseFloat(String(x / win_w * 100)).toFixed(3);
    }
    function hPercent(x) {
        return parseFloat(String(x / win_h * 100)).toFixed(3);
    }
    function noop() { }
    function getArgtype(arg) {
        return Object.prototype.toString.call(arg).toLowerCase().match(/\s(\w+)/)[1];
    }
    function getStyle(node, attr) {
        return (node.nodeType === 1 ? getComputedStyle(node)[attr] : '') || '';
    }
    function getRootNode(el) {
        if (!el)
            return el;
        // console.log(' ====> getArgtype(el)', getArgtype(el))
        var elements = {};
        if (getArgtype(el) === 'string') {
            // console.log(' ====> el string', el)
            elements[el] = document.querySelector("" + el);
            // console.log(' ====> elements', elements)
        }
        if (getArgtype(el) === 'array') {
            // console.log(' ====> el array', JSON.stringify(el))
            el.forEach(function (item) {
                elements[item] = document.querySelector(item);
            });
        }
        // console.log(' ====> elements', JSON.stringify(elements))
        return elements;
    }
    function includeElement(elements, node) {
        return ~elements.indexOf((node.tagName || '').toLowerCase());
    }
    function isHideStyle(node) {
        return getStyle(node, 'display') === 'none' ||
            getStyle(node, 'visibility') === 'hidden' ||
            Number(getStyle(node, 'opacity')) === 0 ||
            node.hidden;
    }
    function isCustomCardBlock(node) {
        var bgStyle = getStyle(node, 'background');
        var bgColorReg = /rgba\([\s\S]+?0\)/ig;
        var bdReg = /(0px)|(none)/;
        var hasBgColor = !bgColorReg.test(bgStyle) || ~bgStyle.indexOf('gradient');
        var hasNoBorder = ['top', 'left', 'right', 'bottom'].some(function (item) {
            return bdReg.test(getStyle(node, 'border-' + item));
        });
        var _a = getRect(node), w = _a.w, h = _a.h;
        var customCardBlock = !!(hasBgColor && (!hasNoBorder || getStyle(node, 'box-shadow') != 'none') && w > 0 && h > 0 && w < 0.95 * win_w && h < 0.3 * win_h);
        return customCardBlock;
    }
    // function calcTextWidth(text, { fontSize, fontWeight }) {
    //     if (!text) return 0;
    //     const div = document.createElement('div');
    //     div.innerHTML = text;
    //     div.style.cssText = [
    //         'position:absolute',
    //         'left:-99999px',
    //         `height:${fontSize}`,
    //         `font-size:${fontSize}`,
    //         `font-weight:${fontWeight}`,
    //         'opacity:0'
    //     ].join(';');
    //     document.body.appendChild(div);
    //     const w = getStyle(div, 'width');
    //     const h = getStyle(div, 'height');
    //     document.body.removeChild(div);
    //     return {
    //         w: parseInt(w),
    //         h: parseInt(h)
    //     };
    // }
    function getRect(node) {
        if (!node)
            return {};
        var _a = node.getBoundingClientRect(), t = _a.top, l = _a.left, w = _a.width, h = _a.height;
        return { t: t, l: l, w: w, h: h };
    }
    function getPadding(node) {
        return {
            paddingTop: parseInt(getStyle(node, 'paddingTop')),
            paddingLeft: parseInt(getStyle(node, 'paddingLeft')),
            paddingBottom: parseInt(getStyle(node, 'paddingBottom')),
            paddingRight: parseInt(getStyle(node, 'paddingRight'))
        };
    }
    function createCommonClass(props) {
        var item = [];
        var style = [];
        // console.log(' ====> class props', JSON.stringify(props))
        for (var prop in props) {
            item.push("\t" + (prop === 'zIndex' ? 'z-index' : prop) + ":" + props[prop] + ";\n");
        }
        style.push("\n.skeleton_item{\n" + item.join('') + "}\n");
        style.push('.skeleton_content{\n\ttop:0%;\n\tleft:0%;\n\twidth:100%;\n\tposition:fixed;\n\tz-index:990;}\n\t');
        // console.log(' ====> css', JSON.stringify(css))
        css = style.join('');
    }
    function parseAgrs(agrs) {
        if (agrs === void 0) { agrs = []; }
        var params = {};
        agrs.forEach(function (agr) {
            var sep = agr.indexOf(':');
            var _a = agr.slice(0, sep).split('-'), appName = _a[0], name = _a[1], type = _a[2];
            var val = agr.slice(sep + 1);
            params[name] = type === 'function' ? eval('(' + val + ')') :
                (type === 'object' || type === 'array') ? JSON.parse(val) :
                    val;
        });
        return params;
    }
    var DrawPageframe = /** @class */ (function () {
        function DrawPageframe(opts) {
            this.offsetTop = 0;
            this.rootNode = getRootNode(opts.rootNode) || document.body;
            this.offsetTop = opts.offsetTop || 0;
            this.includeElement = opts.includeElement;
            this.init = opts.init;
            this.originStyle = {};
            this.index = 1;
        }
        DrawPageframe.prototype.resetDOM = function () {
            this.init && this.init();
            this.originStyle = {
                scrollTop: window.scrollY,
                bodyOverflow: getStyle(document.body, 'overflow')
            };
            window.scrollTo(0, this.offsetTop);
            document.body.style.cssText += 'overflow:hidden!important;';
            drawBlock({
                height: 100,
                zIndex: 990,
                background: '#fff',
                subClas: true
            });
            this.withHeader();
        };
        DrawPageframe.prototype.inHeader = function (node) {
            if (agrs.header) {
                var height = parseInt(agrs.header.height);
                if (height) {
                    var _a = getRect(node), t = _a.t, l = _a.l, w = _a.w, h = _a.h;
                    return t <= height;
                }
            }
        };
        DrawPageframe.prototype.withHeader = function () {
            console.log(' ========> agrs.header', agrs.header);
            if (agrs.header) {
                var _a = agrs.header, height = _a.height, background = _a.background;
                var hHeight = parseInt(height);
                var hBackground = background || agrs.background;
                if (hHeight) {
                    this.index++;
                    drawBlock({
                        height: Number(hPercent(hHeight)),
                        zIndex: 999,
                        background: hBackground,
                        subClas: true
                    });
                }
            }
        };
        DrawPageframe.prototype.showBlocks = function () {
            var keys = Object.keys(blocks);
            if (keys.length) {
                var blocksHTML_1 = {};
                keys.forEach(function (item) {
                    blocksHTML_1[item] = blocks[item].join('');
                });
                // const { body } = document;
                // const blocksHTML = blocks.join('');
                // const div = document.createElement('div');
                // div.innerHTML = blocksHTML;
                // body.appendChild(div);
                // window.scrollTo(0, this.originStyle.scrollTop);
                // document.body.style.overflow = this.originStyle.bodyOverflow;
                return { html: blocksHTML_1, css: css };
            }
        };
        DrawPageframe.prototype.startDraw = function () {
            var _this = this;
            var $this = this;
            function deepFindNode(nodes) {
                if (nodes.length) {
                    for (var i = 0; i < nodes.length; i++) {
                        var node = nodes[i];
                        if (isHideStyle(node) || (getArgtype($this.includeElement) === 'function' && $this.includeElement(node, drawBlock) == false))
                            continue;
                        var childNodes = node.childNodes;
                        var hasChildText = false;
                        var background = getStyle(node, 'backgroundImage');
                        var backgroundHasurl = background.match(/url\(.+?\)/);
                        backgroundHasurl = backgroundHasurl && backgroundHasurl.length;
                        for (var j = 0; j < childNodes.length; j++) {
                            if (childNodes[j].nodeType === 3 && childNodes[j].textContent.trim().length) {
                                hasChildText = true;
                                break;
                            }
                        }
                        if ((includeElement(ELEMENTS, node)
                            || backgroundHasurl
                            || (node.nodeType === 3 && node.textContent.trim().length)
                            || hasChildText
                            || isCustomCardBlock(node))
                            && !$this.inHeader(node)) {
                            var _a = getRect(node), t = _a.t, l = _a.l, w = _a.w, h = _a.h;
                            if (w > 0 && h > 0 && l >= 0 && l < win_w && t < win_h - 100 && t >= 0) {
                                var _b = getPadding(node), paddingTop = _b.paddingTop, paddingLeft = _b.paddingLeft, paddingBottom = _b.paddingBottom, paddingRight = _b.paddingRight;
                                this.index++;
                                drawBlock({
                                    width: Number(wPercent(w - paddingLeft - paddingRight)),
                                    height: Number(hPercent(h - paddingTop - paddingBottom)),
                                    top: Number(hPercent(t + paddingTop)),
                                    left: Number(wPercent(l + paddingLeft)),
                                    radius: getStyle(node, 'border-radius')
                                });
                            }
                        }
                        else if (childNodes && childNodes.length) {
                            if (!hasChildText) {
                                deepFindNode(childNodes);
                            }
                        }
                    }
                }
            }
            console.log(' ====> this.rootNode', "" + this.rootNode);
            // const keys = Object.keys(this.rootNode)
            // console.log(' ====> ', JSON.stringify(keys))
            Object.keys(this.rootNode).forEach(function (item) {
                blocks[item] = [];
                block_key = item;
                _this.resetDOM();
                var value = _this.rootNode[item];
                deepFindNode(value.childNodes);
            });
            // return
            // const nodes = this.rootNode.childNodes;
            return this.showBlocks();
        };
        return DrawPageframe;
    }());
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            try {
                var html = new DrawPageframe({
                    init: agrs.init,
                    rootNode: agrs.rootNode,
                    includeElement: agrs.includeElement
                }).startDraw();
                resolve(html);
            }
            catch (e) {
                reject(e);
            }
        }, 1000);
    });
}
exports.default = evalDOM;
// 待优化：
// 1. table
// 2. 文字