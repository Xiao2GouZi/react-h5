
 ## wepack

    less,
    修改postcss配置文件
    <!-- antd-mobile -->


## 全局属性注入  .env cross-env
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


## UI组件 antd-mobile

全局样式配置: [config/antd-mobile-theme.js](https://github.com/Xiao2GouZi/react-h5/blob/master/config/antd-mobile-theme.js)

## 开发辅助工具(RY系列)

   ### 开发前准备
   * npm link 接下来的ry生效
   * npm run watch:bin2 通过gulp将ry中的TS代码编译成js
   * npm run build:nginx 时本地需要启动Nginx   sudo nginx / sudo nginx -s reload


   [qrcode 扫码直接看效果](https://github.com/Xiao2GouZi/react-h5/blob/master/ry/commanders/qrcode.ts)
    
    ry qrcode
   * normal   (XXX -> 电脑ip)  
       默认路由: http://XXX:3000
   * custom  
      自定义路由: http://XXX:3000/XXX


   [build-nginx](https://github.com/Xiao2GouZi/react-h5/blob/master/ry/commanders/build-nginx.ts)
    
   前提本地安装了nginx, 并且配置nginx.congf配置  

    我的配置
    server {
        listen       8989;
        server_name  localhost;

        location / {
            root /Users/bank/Desktop/nginx/react-h5/;
            index index.html index.htm;
        }
    }

    创建新的 nginx project (对应的nginx需要配置server)
    ry build:nginx -i
  
    选择已有的 nginx project
    ry build:nginx -s


   [自动生成骨架屏](https://github.com/Xiao2GouZi/react-h5/tree/master/ry/commanders/draw-page-structure)  (doing)
   

    创建生成骨架屏的config配置文件   支持单页面以及部分组件
    ry dps:init
    cd到指定的目录下执行下面命令
    ry dps:start

   [创建模板](https://github.com/Xiao2GouZi/react-h5/blob/master/ry/commanders/template.ts)  (doing)

    创建page 模板页面 order page ...
    create page
    ry tpl -p

    创建模板组件
    create component 
    ry tpl -c


   [copy](https://github.com/Xiao2GouZi/react-h5/blob/master/scripts/copy.js)

    npm run copy

   [zip](https://github.com/Xiao2GouZi/react-h5/blob/master/scripts/zip.js)   
    npm run zip


## mock
   [使用参考](https://github.com/Xiao2GouZi/react-h5/blob/master/mock/README.md)

## iconfont
   [使用参考](https://github.com/Xiao2GouZi/react-h5/blob/master/iconfont/README.md)   


## 屏幕适配 (viewport)
   采用 px -> vw, vh, vmax, vmin

   配置连接: [config/postcss.config.js](https://github.com/Xiao2GouZi/react-h5/blob/master/config/postcss.config.js)   

   对vw, vh, vmax, vmin 支持设置: [kits/load-script.ts](https://github.com/Xiao2GouZi/react-h5/blob/master/src/kits/load-script.ts)


## React.Lazy

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


## Redux
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

   



# TODO
   0. 优化完善Redux封装, 创建模板, 自动生成骨架屏
   1. Eslint  prettier
   2. pre commit hook
   3. build 多用途包
   4. 深度 webpack 
   5. h5路由缓存
   6. 自动化测试