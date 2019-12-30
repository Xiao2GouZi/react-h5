#!/usr/bin/env node

const path = require('path')
const fsExtra = require('fs-extra')
const prompts = require('prompts')

import * as DefConf from './default.config'
// import * as Utils from './utils'

const resolveDir = dir => path.join(__dirname, "../../../", dir);
const resolveCwd = dir => path.resolve(process.cwd(), dir);

async function dpsInit() {
    const dpsConfFile = resolveDir(DefConf.filename)
    if (fsExtra.existsSync(dpsConfFile)) {
        return console.log(`\n[${DefConf.filename}] had been created! you can edit it and then run 'ry dps:start'\n`)
    }
    const { url } = await askForConfig()
    const { value } = await prompts({
        type: 'toggle',
        name: 'value',
        message: `Are you sure to create skeleton screen base on ${url}.`,
        initial: true,
        active: 'Yes',
        inactive: 'no'
    })
    if (value) {
        fsExtra.writeFile(
            resolveDir(DefConf.filename),
            DefConf.config(url),
            err => {
                if (err) throw err;
                console.log(`\n[${DefConf.filename}] had been created! now, you can edit it and then run 'ry dps:start'\n`)
            }
        )
    }
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
        }
    ];
    return prompts(questions);
}



export default dpsInit