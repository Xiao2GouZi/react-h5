
let Mock = require('mockjs');
const path = require('path');
const fs = require('fs');

const express = require('express');
const http = require('http')
    , https = require('https');
let app = express();
const dataPath = 'mock/data';

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

let mockData = {};
let dirs = fs.readdirSync(resolve(dataPath));
dirs.forEach(item => {
    let fileName = item.split('.')[0];
    // console.log(' -- file name', fileName)
    let fileData = fs.readFileSync(`${dataPath}/${item}`);
    // console.log('file data',fileData.toString())
    mockData[fileName] = JSON.parse(fileData.toString())
});
console.log(' --- mock data', mockData);



app.all('*', function(req, res) {
    console.log('originalUrl --> ', req.originalUrl);
    let queryArr = req.originalUrl.split('/');
    console.log(' -- originalUrl', queryArr);
    let lastQ = queryArr.pop();
    console.log(' -- originalUrl last ', lastQ);
    let response = mockData[lastQ]
    console.log(' -- query data', response);
    res.json(Mock.mock(response));
});



/*为app添加中间件处理跨域请求*/
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Upgrade-Insecure-Requests', '1');
    next();
});


http.createServer(app).listen(8090);
https.createServer(app).listen(443);

