
const fs = require('fs')
const stat = fs.stat;
const chalk = require("chalk");
const path = require("path");
const resolve = dir => path.join(__dirname, "", dir);

/*
 * 复制目录中的所有文件包括子目录
 * @param{ String } 需要复制的目录
 * @param{ String } 复制到指定的目录
 */
var copy = function (src, dst) {
    // 读取目录中的所有文件/目录
    fs.readdir(src, function (err, paths) {
        if (err) {
            console.log(chalk.red(`Tip: copy ====> err【${err}】`));ß
            throw err;
        }
        paths.forEach(function (path) {
            var _src = src + '/' + path,
                _dst = dst + '/' + path,
                readable, writable;
            stat(_src, function (err, st) {
                if (err) {
                    console.log(chalk.red(`Tip: copy ====> err【${err}】`));
                    throw err;
                }

                // 判断是否为文件
                if (st.isFile()) {
                    // 创建读取流
                    readable = fs.createReadStream(_src);
                    // 创建写入流
                    writable = fs.createWriteStream(_dst);
                    // 通过管道来传输流
                    readable.pipe(writable);
                }
                // 如果是目录则递归调用自身
                else if (st.isDirectory()) {
                    exists(_src, _dst, copy);
                }
            });
        });
    });
};
// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
var exists = function (src, dst, callback) {

    if (!fs.existsSync(src)) {    //需要复制的目录不存在
        console.log(chalk.red(`Tip: copy ====> err【not fount ${src}】`));
        return
    }
    if (!fs.existsSync(dst)) {   //复制到指定的目录  不存在创建
        fs.mkdirSync(dst);
    }
    callback(src, dst);
};


//获取 source output
const argv = process.argv
const source = argv[2].split("=")[1];
const output = argv[3].split("=")[1]
console.log(chalk.yellow(`Tip: copy ====> source【${resolve(source)}】`));
console.log(chalk.yellow(`Tip: copy ====> output【${resolve(output)}】`));

// 复制目录
exists(resolve(source), resolve(output), copy);




/**
 *  exmple:
 *
 *  package.json
 *  "copy": "node copy.js source=dist output=code"
 *
 *  npm run copy
 *
 */
