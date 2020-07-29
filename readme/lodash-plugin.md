


 ### Lodash Pugin

    webpack 4.0
    
   #### 插件
    @babel/preset-env 
    @babel/core 
    babel-loader 
    babel-plugin-lodash 
    lodash-webpack-plugin

  ### .babelrc 配置
    {
        "plugins": [
            ["lodash"]
        ]
    }  
    
  ### webpack.config 配置
    const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

    plugins:[
        ...
        new LodashModuleReplacementPlugin(lodashWebpackPluginConfig),
        ...
    ]
          
