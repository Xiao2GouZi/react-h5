

var os=require('os');
var homedir=os.homedir();
console.log('homedir', homedir);
console.log('os', os);


// const path = require("path");
// const fs = require("fs");
// const chalk = require("chalk");
// const compressing = require("compressing");
// const dayjs = require("dayjs");

// const resolve = dir => path.join(__dirname, "../", dir);

// const argv = process.argv
// const source = argv[2].split("=")[1];
// const output = argv[3].split("=")[1]

// const sourceResolve = resolve(`${source}/`)
// const outputResolve = resolve(`${output}/`)
// console.log(chalk.yellow(`Tip: zip ====> source【${sourceResolve}】`));
// console.log(chalk.yellow(`Tip: zip ====> output【${outputResolve}】`));

// const zipPath = (() => `${output}/${dayjs().format("YYYYMMDD_HHmmss")}.zip`)();

// // 判断是否存在当前publish路径，没有就新增
// if (!fs.existsSync(outputResolve)) {
//     fs.mkdirSync(outputResolve);
// }

// compressing.zip
//     .compressDir(sourceResolve, resolve(zipPath))
//     .then(() => {
//         console.log(chalk.yellow(`Tip: 文件压缩成功，已压缩至【${resolve(zipPath)}】`));
//     })
//     .catch(err => {
//         console.log(chalk.red("Tip: 压缩报错"));
//         console.error(err);
//     });


// /**
// *  exmple:
// *
// *  package.json
// *  "zip": "node zip.js source=bundle output=bundle-zip",
// *
// *  npm run zip
// *
// */
