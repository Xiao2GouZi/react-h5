const hd = 1

//  尺寸转换
const _size = (size) => {
    return `${size * hd}px`
}

const _theme = {
    "brand-primary": "#108ee9",
    "brand-primary-tap": "#0e80d2",
    "button-height": _size(47),
    "border-width-lg": _size(2),
}

const defaultTheme = {
    "hd":_size(1), // 基本单位

// 支付宝钱包默认主题
// https://github.com/ant-design/ant-design-mobile/wiki/设计变量表及命名规范

// 色彩
// ---
// 文字色
"color-text-base": "#000",                  // 基本
"color-text-base-inverse": "#fff",          // 基本 - 反色
"color-text-secondary": "#a4a9b0",          // 辅助色
"color-text-placeholder": "#bbb",           // 文本框提示
"color-text-disabled": "#bbb",              // 失效
"color-text-caption": "#888",               // 辅助描述
"color-text-paragraph": "#333",             // 段落
"color-link": _theme['brand-primary'],            // 链接

// 背景色
"fill-base": "#fff",                           // 组件默认背景
"fill-body": "#f5f5f9",                        // 页面背景
"fill-tap": "#ddd",                            // 组件默认背景 - 按下
"fill-disabled": "#ddd",                       // 通用失效背景
"fill-mask": "rgba(0, 0, 0, 0.4)",              // 遮罩背景
"color-icon-base": "#ccc",                      // 许多小图标的背景，比如一些小圆点，加减号
"fill-grey": "#f7f7f7",

// 透明度
"opacity-disabled": "0.3",   // switch checkbox radio 等组件禁用的透明度

// 全局/品牌色
"brand-primary": "#108ee9",
"brand-primary-tap": _theme['brand-primary-tap'],
"brand-success": "#6abf47",
"brand-warning": "#ffc600",
"brand-error": "#f4333c",
"brand-important": "#ff5b05",  // 用于小红点
"brand-wait": "#108ee9",

// 边框色
"border-color-base": "#ddd",

// 字体尺寸
// ---
"font-size-icontext": _size(10),
"font-size-caption-sm": _size(12),
"font-size-base": _size(14),
"font-size-subhead": _size(15),
"font-size-caption": _size(16),
"font-size-heading": _size(17),

// 圆角
// ---
"radius-xs": _size(2),
"radius-sm": _size(3),
"radius-md": _size(5),
"radius-lg": _size(7),
"radius-circle": "50%",

// 边框尺寸
// ---
"border-width-sm": "1PX",
"border-width-md": "1PX",
"border-width-lg": _size(2),

// 间距
// ---
// 水平间距
"h-spacing-sm": _size(5),
"h-spacing-md": _size(8),
"h-spacing-lg": _size(15),

// 垂直间距
"v-spacing-xs": _size(3),
"v-spacing-sm": _size(6),
"v-spacing-md": _size(9),
"v-spacing-lg": _size(15),
"v-spacing-xl": _size(21),

// 高度
// ---
"line-height-base": 1,           // 单行行高
"line-height-paragraph": 1.5,    // 多行行高

// 图标尺寸
// ---
"icon-size-xxs": _size(15),
"icon-size-xs": _size(18),
"icon-size-sm": _size(21),
"icon-size-md": _size(22),       // 导航条上的图标、grid的图标大小
"icon-size-lg": _size(36),

// 动画缓动
// ---
"ease-in-out-quint": "cubic-bezier(.86, 0, .07, 1)",

// 组件变量
// ---

"actionsheet-item-height": _size(50),
"actionsheet-item-font-size": _size(18),

// button
"button-height": _theme['button-height'],
"button-font-size": _size(18),

"button-height-sm": _size(30),
"button-font-size-sm": _size(13),

"primary-button-fill": _theme['brand-primary'],
"primary-button-fill-tap": _theme['brand-primary-tap'],

"ghost-button-color": _theme['brand-primary'],    // 同时应用于背景、文字颜色、边框色
"ghost-button-fill-tap": `fade(${_theme['brand-primary']}, 60%)`,

"warning-button-fill": "#e94f4f",
"warning-button-fill-tap": "#d24747",

"link-button-fill-tap": "#ddd",
"link-button-font-size": _size(16),

// menu
"menu-multi-select-btns-height": _theme['button-height'],

// modal
"modal-font-size-heading": _size(18),
"modal-button-font-size": _size(18), // 按钮字号
"modal-button-height": _size(50), // 按钮高度

// list
"list-title-height": _size(30),
"list-item-height-sm": _size(35),
"list-item-height": _size(44),

// input
"input-label-width": _size(17),       // InputItem、TextareaItem 文字长度基础值
"input-font-size": _size(17),
"input-color-icon": "#ccc", // input clear icon 的背景色
"input-color-icon-tap": _theme['brand-primary'],

// tabs
"tabs-color": _theme['brand-primary'],
"tabs-height": _size(43.5),
"tabs-font-size-heading": _size(15),
"tabs-ink-bar-height": _theme["border-width-lg"],

// segmented-control
"segmented-control-color": _theme["brand-primary"],  // 同时应用于背景、文字颜色、边框色
"segmented-control-height": _size(27),
"segmented-control-fill-tap": `fade(${_theme["brand-primary"]}, 0.1)`,

// tab-bar
"tab-bar-fill": "#ebeeef",
"tab-bar-height": _size(50),

// toast
"toast-fill": "rgba(58, 58, 58, 0.9)", // toast, activity-indicator 的背景颜色

// search-bar
"search-bar-fill": "#efeff4",
"search-bar-height": _size(44),
"search-bar-input-height": _size(28),
"search-bar-font-size": _size(15),
"search-color-icon": "#bbb", // input search icon 的背景色

// notice-bar
"notice-bar-fill": "#fefcec",
"notice-bar-height": _size(36),
"notice-bar-color": "#f76a24",

// switch
"switch-fill": "#4dd865",
"switch-fill-android": _theme["brand-primary"],

// tag
"tag-height": _size(25),
"tag-height-sm": _size(15),
"tag-color": _theme["brand-primary"],

// keyboard
"keyboard-confirm-color": _theme["brand-primary"],
"keyboard-confirm-tap-color": _theme["brand-primary-tap"],

// picker
"option-height": _size(42),           // picker 标题的高度

// z-index
"progress-zindex": 2000,
"popover-zindex": 1999,
"toast-zindex": 1999,
"action-sheet-zindex": 1000, // actonsheet 会放到 popup / modal 中
"picker-zindex": 1000,
"popup-zindex": 999,
"modal-zindex": 999, // modal.alert 应该最大，其他应该较小
"tabs-pagination-zindex": 999,

}

module.exports = defaultTheme;