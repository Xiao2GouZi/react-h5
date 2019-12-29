#!/usr/bin/env node

const path = require('path')
const fsExtra = require('fs-extra')
const prompts = require('prompts')

import DefConf from './default.config'
import * as Utils from './utils'

const resolveDir = dir => path.join(__dirname, "../../../", dir);
const resolveCwd = dir => path.resolve(process.cwd(), dir);


// const currDir = process.cwd()

function dpsInit() {
    console.log(' ======> currDir')
    const dpsConfFile = resolveCwd(DefConf.filename) 
    if (fsExtra.existsSync(dpsConfFile)) {
        return console.log(`\n[${DefConf.filename}] had been created! you can edit it and then run 'dps start'\n`)
    }
    askForConfig().then(({ url, filepath }) => {
        const outputPath = filepath ? resolveCwd(filepath).replace(/\\/g, '\\\\') : '';
        prompts({
            type: 'toggle',
            name: 'value',
            message: `Are you sure to create skeleton screen base on ${url}. \n and will output to ${Utils.calcText(outputPath)}`,
            initial: true,
            active: 'Yes',
            inactive: 'no'
        }).then(res => {
            if (res.value) {
                fsExtra.writeFile(
                    resolveCwd(DefConf.filename),
                    DefConf.getTemplate({
                        url: url,
                        filepath: outputPath
                    }),
                    err => {
                        if (err) throw err;
                        console.log(`\n[${DefConf.filename}] had been created! now, you can edit it and then run 'dps start'\n`)
                    }
                )
            }
        })
    });
}


function askForConfig() {
    const questions = [
        {
            type: 'text',
            name: 'url',
            message: "What's your page url ?",
            validate: function (value) {
                const urlReg = /^https?:\/\/.+/ig;
                if (urlReg.test(value)) {
                    return true;
                }

                return 'Please enter a valid url';
            }
        },
        {
            type: 'text',
            name: 'filepath',
            message: "Enter a relative output filepath ? (optional)",
            validate: function (value) {
                const filepath = path.isAbsolute(value) ? value : resolveDir(value);
                console.log(' =====> filepath', filepath)
                const exists = fsExtra.existsSync(filepath);
                if (value && !exists) {
                    return 'Please enter a exists target';
                }
                return true;
            }
        }
    ];
    return prompts(questions);
}



export default dpsInit