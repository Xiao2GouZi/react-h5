.env  
 key=value
 process.env 挂载环境变量
 key "REACT_APP_" 字符开头, 不然process.env没有


 cross-env  
根据编译指令,注入参数 REACT_APP_ENTRY=index/index-demo  同.env