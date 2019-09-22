.env  
 key=value
 process.env 挂载环境变量
 key "REACT_APP_" 字符开头, 不然process.env没有


 wepack.config.js

    less,
    修改postcss配置文件
    <!-- antd-mobile -->





 cross-env  
根据编译指令,注入参数 REACT_APP_ENTRY=index/index-demo  同.env

antd-mobile
全局样式配置 config/antd-mobile-theme.js



postcss-px-to-viewport   px -> vw,vh
postcss 配置 config/postcss.config.js