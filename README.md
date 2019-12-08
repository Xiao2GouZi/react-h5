
 # wepack

    less,
    修改postcss配置文件
    <!-- antd-mobile -->


# 全局属性注入  .env cross-env
   ### .env
   [添加](https://github.com/Xiao2GouZi/react-h5/blob/master/.env) 
   ```
   // 是否开启vconsle  true,false
   REACT_APP_V_CONSLO = true

   //环境变量
   REACT_APP_BUSINESS_ENV = pre  

   // 是否在npm run start 自动打开网页
   REACT_APP_OPEN_BROWSER = false
   ```
   使用
   ```
   process.env.REACT_APP_V_CONSLO
   ```

   ### cross-env
   添加 
   ```
    "start": "cross-env REACT_APP_ENTRY=index  nodemon scripts/start.js",
   ```
   使用
   ```
   process.env.REACT_APP_ENTRY
   ```


# UI组件 antd-mobile

全局样式配置: [config/antd-mobile-theme.js](https://github.com/Xiao2GouZi/react-h5/blob/master/config/antd-mobile-theme.js)

# 开发辅助工具
   [qrcode 扫码直接看效果](https://github.com/Xiao2GouZi/react-h5/blob/master/scripts/qrcode.js)
    
    npm run qrcode
   * normal  
      默认路由: http://192.168.0.1:3000
   * custom 
      自定义路由: http://192.168.0.1:3000/XXX

   [copy](https://github.com/Xiao2GouZi/react-h5/blob/master/scripts/copy.js)

    npm run copy

   [zip](https://github.com/Xiao2GouZi/react-h5/blob/master/scripts/zip.js)   

    npm run zip

   [build-nginx](https://github.com/Xiao2GouZi/react-h5/blob/master/scripts/build-nginx.js)
    
   前提本地安装了nginx, 并且nginx.congf配置  

    我的配置
    server {
        listen       8989;
        server_name  localhost;

        location / {
            root /Users/bank/Desktop/nginx/react-h5/;
            index index.html index.htm;
        }
    }

    npm run build:nginx



# mock
   [使用参考](https://github.com/Xiao2GouZi/react-h5/blob/master/mock/README.md)

# iconfont
   [使用参考](https://github.com/Xiao2GouZi/react-h5/blob/master/iconfont/README.md)   


# 屏幕适配 (viewport)
   采用 px -> vw, vh, vmax, vmin

   配置连接: [config/postcss.config.js](https://github.com/Xiao2GouZi/react-h5/blob/master/config/postcss.config.js)   

   对vw, vh, vmax, vmin 支持设置: [kits/load-script.ts](https://github.com/Xiao2GouZi/react-h5/blob/master/src/kits/load-script.ts)


# React.Lazy

   ```
   import { LazyComponent } from '@components'

   render(){
      return {
         <div>
         ...
            <LazyComponent>
               <Button/>
            </LazyComponent>
         ...
         </div>
      }
   }

   ```


# Redux`
   [redux]()  
   [react-redux]()    
   [redux-logger]()  
   [redux-thunk]()   
   [redux-actions]()   
   [redux-batched-actions]()   
   [reselect]()    
   [redux-devtools-extension]()

   ### redux包装 [redux-config/index.tsx](https://github.com/Xiao2GouZi/react-h5/blob/master/src/redux-config/) 
    
   ### redux demo [src/app-demo/redxu-demo/](https://github.com/Xiao2GouZi/react-h5/tree/master/src/app-demo/redux-demo)

   
  