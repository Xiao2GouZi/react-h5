const shell = require('shelljs');
const chalk = require("chalk");
const path = require("path");
const fs = require("fs");
const openBrowser = require('react-dev-utils/openBrowser');




const resolve = dir => path.join(__dirname, "../", dir);
// 项目中build路径
const buildPath = resolve(`build/`)
// nginx config配置的路径
const toPath = '/Users/bank/Desktop/nginx/react-h5/'

const host = 'http://localhost'
// nginx 配的port
const port = '8989'


// 判断是否存在当前build路径，没有直接终止
if (!fs.existsSync(buildPath)) {
    console.log(chalk.red('build not found, please npm run build'))
    return
}

// 判断是否存在当前build路径，没有直接终止
if (!fs.existsSync(toPath)) {
    console.log(chalk.red('nginx project not found, please config something'))
    return
}

console.log(chalk.green('copy from ===> ', buildPath))
console.log(chalk.green('copy to ===> ', toPath))

shell.rm('-rf', toPath + '*')
shell.cp("-r", buildPath + '*', toPath)


openBrowser(host + ':' + port);