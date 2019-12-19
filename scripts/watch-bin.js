const chokidar = require('chokidar');
const path = require("path");
const chalk = require("chalk");


const resolve = dir => path.join(__dirname, "../", dir);


const watcher = chokidar.watch(`${resolve('ry')}`, {

})

watcher.on('all', function (eventName, path, stats) {
    console.log(chalk.green('event ==> ', eventName))
    console.log(chalk.green('path ===> ', path))
    // console.log(chalk.green('stats ==> ', stats))


    if (eventName === 'change') {


    }

})


watcher.on('error', function (err) {
    console.log(chalk.red('watcher error', err))
})
Î
watcher.on('raw', function (eventName, path, details) {


})

watcher.on('ready', function () {
    console.log(chalk.green('watcher ready '))

})

