
 wepack.config.js

    less,
    修改postcss配置文件
    <!-- antd-mobile -->


### 全局属性注入  .env cross-env
   #### .env
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

   #### cross-env
   添加 
   ```
    "start": "cross-env REACT_APP_ENTRY=index  nodemon scripts/start.js",
   ```
   使用
   ```
   process.env.REACT_APP_ENTRY
   ```


### UI组件 antd-mobile

全局样式配置: [config/antd-mobile-theme.js](https://github.com/Xiao2GouZi/react-h5/blob/master/config/antd-mobile-theme.js)



### 屏幕适配 (viewport)
   采用 px -> vw, vh, vmax, vmin

   配置连接: [config/postcss.config.js](https://github.com/Xiao2GouZi/react-h5/blob/master/config/postcss.config.js)   

   对vw, vh, vmax, vmin 支持设置: [kits/load-script.ts](https://github.com/Xiao2GouZi/react-h5/blob/master/src/kits/load-script.ts)


### React.Lazy

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

