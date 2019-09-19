### 添加数据

   1. 在data文件下添加json文件  
```   
      {
        "code": "000",
        "data":{
                 "name": "小明",
                 "age":"12",
                 "sex":"男"
                },
        "message": ""
      }
```
   2. 文件名一定要是query最后的  
      例如:
      query: http://127.0.0.1:8090/userInfo  
      文件名: userInfo.json  
   
### 使用
    
   __启动mock__
   yarn mock
   
```   
   
   textFetchMock = async () => {
        let response = await Fetch.Get({url: 'http://127.0.0.1:8090/userInfo'})
            .catch(err => {
            console.log(' --- fetch err', err)
        });
        console.log(' --- fetch res', response)
    }
    
```