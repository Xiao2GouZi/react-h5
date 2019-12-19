const glob = require("glob")
const fsExtra = require('fs-extra')
const path = require("path");
const chalk = require("chalk");
const inquirer = require('inquirer');


/**
 * 
 * @param cmd 
 * ß
 */
async function copyTemplate(cmd) {
    const { pageType, pageName } = await condition()
    console.log(chalk.green(`template type ====>  ${pageType}`))
    console.log(chalk.green(`page name  ====>  ${pageName}`))
    const cwd = process.cwd()
    if (cmd.overrid) {
        const { success, path } = await getDestinationPath(pageName)
        if (success) {
            console.log(chalk.yellow(`destination exit ==> ${path} `))
            try {
                const removeD = await fsExtra.removeSync(path)
                console.log(chalk.green(`remove destination success`))
            } catch (error) {
                console.log(chalk.red(`destination remove path err ==> ${error} `))
            }
        } else {
            console.log(chalk.green(`destination path not exit`))
        }
    }
    const { success, path } = await getTemplatePath(pageType)
    if (!success) return
    if (!fsExtra.pathExistsSync(path)) {
        console.log(chalk.red(`template not exit ${path}`))
        return
    }
    console.log(chalk.green(`template path  ${path}`))
    if (fsExtra.pathExistsSync(path)) {
        try {
            fsExtra.copySync(path, cwd + `/${pageName}`)
            console.log(chalk.green(`copy success `))
        } catch (error) {
            console.log(chalk.red(`copy err`))
            return
        }
    }
    writeReducer(pageName)
    setPage(pageName)
}

/** 筛选条件 */
async function condition() {
    const promptList = [{
        type: 'list',
        name: 'name',
        message: '请选择需要创建的页面类型',
        choices: ['page', 'order']
    }]
    let pageType = await inquirer.prompt(promptList)
    const promptInput = [{
        type: 'input',
        name: 'name',
        message: '请输入页面名称',
    }]
    let pageName = await inquirer.prompt(promptInput)
    return {
        pageType: pageType.name,
        pageName: pageName.name
    }
}


/** 模板路径 */
function getTemplatePath(type = ''): Promise<{ success: boolean, path: string }> {
    return new Promise((resolve, reject) => {
        const _type = type ? `/${type}` : ''
        const typePath = path.join(__dirname, "../../", "template") + _type
        console.log(chalk.green(`template path ${typePath}`))
        glob(typePath, {}, function (er, file) {
            if (!file.length) {
                console.log(chalk.red(`template path err ${typePath}`))
            }
            resolve({ success: !!file.length, path: file[0] })
        })
    })
}

/** 拷贝目的路径 */
function getDestinationPath(type = ''): Promise<{ success: boolean, path: string }> {
    return new Promise((resolve, reject) => {
        const _type = type ? `/${type}` : ''
        const path = process.cwd() + _type
        console.log(chalk.green(`destination path ${path}`))
        glob(path, {}, function (er, file) {
            resolve({ success: !!file.length, path: file[0] })
        })
    })
}

/** 设置全局的redux-config */
function writeReducer(pageName = '') {
    const _pageName = chartUp(pageName)
    const reducerPath = path.join(__dirname, "../../", "src/redux-config/reducers.ts")
    if (!fsExtra.existsSync(reducerPath)) {
        console.log(chalk.red(' ------> 为解析到', reducerPath))
        return
    }
    const pagePath = `${process.cwd()}/${pageName}`
    const reducerContent = fsExtra.readFileSync(reducerPath, "utf8")
    const reducerArr = reducerContent.split('\n')
    reducerArr.unshift(`import ${_pageName}Reducer from \'../${pagePath.split("src/")[1]}/reducer\'`)
    const interfaceIndex = reducerArr.indexOf('export interface IReducers {')
    if (reducerContent === -1) {
        console.log(chalk.red(' ------> reducer 结构有问题，请检查'))
        return
    }
    reducerArr.splice(interfaceIndex + 1, 0, `    ${_pageName}Reducer: any,`)
    const exportIndex = reducerArr.indexOf('const reducers: IReducers = {')
    if (exportIndex === -1) {
        console.log(chalk.red(' ------> reducer 结构有问题，请检查'))
        return
    }
    reducerArr.splice(exportIndex + 1, 0, `    ${_pageName}Reducer: ${_pageName}Reducer,`)
    const reducerStr2 = reducerArr.join('\n')
    console.log(chalk.green(' ==> success \n', reducerStr2))

    fsExtra.writeFileSync(reducerPath, reducerStr2)
}


/** 获取指定字符串之间的字符串 */

function getInnerString(source, prefix, postfix) {
    const encodeReg = (source) => {
        return String(source).replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
    }
    const regexp = new RegExp(encodeReg(prefix) + '.+' + encodeReg(postfix), 'gi');
    const matches = String(source).match(regexp);
    const func = (elem) => {
        return elem.replace(prefix, '').replace(postfix, '');
    }
    const arr = matches.map(func)
    return arr;
}

/**
 * 修改page中的reducer名称
 */
function setPage(pageName = '') {
    const _pageName = chartUp(pageName)
    const pagePath = `${process.cwd()}/${pageName}/components/user-info/index.tsx`
    if (!fsExtra.existsSync(pagePath)) {
        console.log(chalk.red(' ------> 未解析到', pagePath))
        return
    }
    const pageContent = fsExtra.readFileSync(pagePath, "utf8")
    const pageArr = pageContent.split('\n')
    let pageExportStr = ''
    let targetIndex = 0
    pageArr.forEach((item, index) => {
        if (item.indexOf('RYConnect') > 0) {
            pageExportStr = item
            targetIndex = index
        }
    })
    const targetArr = getInnerString(pageExportStr, "[", "]")
    const targetStr = targetArr[0].split(',')[0]
    pageExportStr = pageExportStr.replace(targetStr, `\'${_pageName}Reducer\'`)
    console.log(chalk.green(' ===> pageExportStr', pageExportStr))
    pageArr[targetIndex] = pageExportStr
    const pageContent2 = pageArr.join('\n')
    fsExtra.writeFileSync(pagePath, pageContent2)
}


function chartUp(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}



export {
    copyTemplate
}




/**
 *
 * //TODO:  ---->
 *
 *
 *
 */


