#!/usr/bin/env node
const os = require('os')
const chalk = require("chalk");
const qrcodeTerminal = require('qrcode-terminal')
const inquirer = require('inquirer');
const interfaces = os.networkInterfaces()

function getIPAdress() {
    for (const devName in interfaces) {
        const iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            const alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

const qrcode = async () => {
    const promptList = [{
        type: 'list',
        name: 'description',
        message: '请选择开启的页面',
        choices: ['normal', 'custom']
    }]
    let res = await inquirer.prompt(promptList)
    let route = ''
    if (res.description === 'custom') {
        const promptInput = [{
            type: 'input',
            name: 'description',
            message: '请输入需要打开的页面路由',
        }]
        let _res = await inquirer.prompt(promptInput)
        route = _res.description
    }
    let qrUrl = "http://" + getIPAdress() + ":3000"
    if (route.length > 0) {
        qrUrl = qrUrl + "/" + route
    }
    console.log(chalk.yellow('qrcode url' + qrUrl));
    qrcodeTerminal.generate(qrUrl, {
        small: false
    })
}

qrcode()




