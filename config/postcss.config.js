module.exports = {
    "plugins": {
        'postcss-flexbugs-fixes': {},

        'postcss-preset-env': {
            autoprefixer: {
                flexbox: 'no-2009',
            },
            stage: 3,
        },

        'postcss-normalize': {},

        "postcss-px-to-viewport": {
            unitToConvert: 'px',      // 需要转换的单位，默认为"px"
            viewportWidth: 375,    // 设计稿的视口宽度, 将根据视口做比例换算
            unitPrecision: 5,      //// 转化精度，转换后保留位数
            propList: ['*'],            // 能转化为vw的属性列表   '*'  所有
            viewportUnit: 'vw',       // 希望使用的视口单位
            fontViewportUnit: 'vw',    // 字体使用的视口单位
            selectorBlackList: [],       // 需要忽略的CSS选择器
            minPixelValue: 1,             // 最小的转换数值    
            mediaQuery: true,     // 媒体查询里的单位是否需要转换单位
            replace: true,      // 转换后是否添加备用单位
            exclude: /(\/|\\)(node_modules)(\/|\\)/,   // 忽略文件目录
            landscape: false,   // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
            landscapeUnit: 'vh',     // 横屏时使用的单位
            landscapeWidth: 1334    // 横屏时使用的视口宽度
        },

        "postcss-write-svg": {
            utf8: false
        },
        "postcss-viewport-units": {},   //给CSS的属性添加content的属性，配合viewport-units-buggyfill库给vw、vh、vmin和vmax做适配的操作

        // PostCSS的CSS优化和分解插件
        "cssnano": {
            "cssnano-preset-advanced": {
                zindex: false,
                autoprefixer: false
            },
            // preset: "advanced",
            // autoprefixer: false,
            // "postcss-zindex": false
        }
    }

}