const glob = require("glob")
const fsExtra = require('fs-extra')
const path = require("path");
const chalk = require("chalk");
const inquirer = require('inquirer');
const _ = require('loadsh')

const resolve = dir => path.join(__dirname, "../../", dir);

/** 全局配置的reducer */
const reducerPath = resolve("src/redux-config/reducers.ts")
const templatePath = resolve("template")




function template(cwd) {
    if (cwd.page) {
        templatePage()
    }
    if (cwd.component) {
        templateComponent()
    }
}

/**
*  create template page
*/
async function templatePage() {
    let pageName = '';
    let pageType = '';
    let reducerName: { key: boolean, value: string }[];
    const pageConditionRes = await pageCondition()
    if (!pageConditionRes.success) return
    pageName = pageConditionRes.param.pageName
    pageType = pageConditionRes.param.pageType
    reducerName = pageConditionRes.param.reducerName
    console.log(chalk.green(`template type ====> ${pageType}`))
    console.log(chalk.green(`page name ====> ${pageName}`))
    console.log(chalk.green(`reducer name ====> ${reducerName}`))

    /** 目标文件是否存在, 存在删除 */
    const destinationRes = await getDestinationPath(pageName)
    if (destinationRes.success) {
        console.log(chalk.yellow(`destination exit ==> ${destinationRes.path} `))
        try {
            await fsExtra.removeSync(destinationRes.path)
            console.log(chalk.green(`remove destination success`))
        } catch (error) {
            console.log(chalk.red(`destination remove path err ==> ${error} `))
        }
    } else {
        console.log(chalk.green(`destination path not exit`))
    }

    /** 查看模板文件 并拷贝到指定目录下*/
    const { success, path } = await getTemplatePath(pageType)
    if (!success) return
    if (!fsExtra.pathExistsSync(path)) {
        console.log(chalk.red(`template not exit ${path}`))
        return
    }
    console.log(chalk.green(`template path ${path}`))
    try {
        const cwd = process.cwd()
        fsExtra.copySync(path, cwd + `/${pageName}`)
        console.log(chalk.green(`copy success `))
    } catch (error) {
        console.log(chalk.red(`copy err`))
    }
    writeReducer(pageName, reducerName)
    setPage(pageName, reducerName)
}

/** 筛选条件 */
async function pageCondition(): Promise<{ success: boolean, param?: { pageType: string, pageName: string, reducerName: { key: boolean, value: string }[] } }> {
    const { success, path } = await getTemplatePath()
    if (!success) {
        console.log(chalk.red(`template ====> fail`))
        return { success: false }
    }
    console.log(chalk.green(`template path ====> ${path}`))
    let files: string[] = fsExtra.readdirSync(path)
    console.log(chalk.green(`template type ====>`, files))
    files = _.remove(files, item => item !== 'component')
    const promptList = [{
        type: 'list',
        name: 'name',
        message: '请选择需要创建的页面类型',
        choices: files
    }]
    let pageType = await inquirer.prompt(promptList)
    const pageName = await setPageName()
    const reducers = getReducer()
    console.log(chalk.green(`reducers ====>`, reducers))
    const selectReducer = _.concat(reducers, ['custom'])
    const promptReducer = [{
        type: 'checkbox',
        name: 'name',
        message: '请选择需要绑定的reducer',
        choices: selectReducer,
        validate: function (value) {
            console.log(' =======> value', value)
            return true
        }
    }]
    let reducerName: { key: boolean, value: string }[]
    let reducerObj: { name: string[] } = await inquirer.prompt(promptReducer)
    if (!reducerObj.name.length) {
        console.log(chalk.red(`请设置reducer name`))
        return {
            success: false
        }
    }
    reducerName = _.map(reducerObj.name, item => {
        return {
            key: item === 'custom',
            value: item
        }
    })
    let custReducer = _.filter(reducerName, item => item.key)
    if (custReducer.length) {
        const name = await setReducerName(reducers)
        _.forEach(reducerName, item => {
            if (item.key) {
                item.value = name
            }
        })
    }
    return {
        success: true,
        param: {
            pageType: pageType.name,
            pageName: pageName,
            reducerName: reducerName
        }
    }
}



/** set page name */
async function setPageName(): Promise<string> {
    const promptInput = [{
        type: 'input',
        name: 'name',
        message: '请输入页面名称',
    }]
    let pageName = await inquirer.prompt(promptInput)
    if (fsExtra.pathExistsSync(`${process.cwd()}/${pageName.name}`)) {
        const promptList = [{
            type: 'list',
            name: 'name',
            message: '该路径下页面已经存在，请选择如何操作。 again: 重新输入; continue: 删除存在的，创建新的',
            choices: ['again', 'continue']
        }]
        let pageNameS = await inquirer.prompt(promptList)

        console.log(' ===> ', pageNameS)
        if (pageNameS.name === 'again') {
            return await setPageName()
        } else if (pageNameS.name === 'continue') {
            return pageName.name
        }
    } else {
        return pageName.name
    }
}

/** set reducer name */
async function setReducerName(reducers: string[]): Promise<string> {
    const promptInputReducer = [{
        type: 'input',
        name: 'name',
        message: '请输入reducer名称 eg. xxxReducer 首字母大写, 驼峰,添加Reducer',
        filter: function (value) {
            const _value = chartUp(value)
            return _value.indexOf('Reducer') >= 0 ? _value : `${_value}Reducer`
        }
    }]
    let reducername = await inquirer.prompt(promptInputReducer)
    if (_.indexOf(reducers, reducername.name) >= 0) {
        const promptAffirm = {
            type: "confirm",
            message: "已存在reducers中，是否重新输入",
            name: "name",
        }
        const affirm = await inquirer.prompt(promptAffirm)
        if (affirm.name) {
            return await setReducerName(reducers)
        } else {
            return reducername.name
        }
    }
    return reducername.name
}

/** 模板路径 */
function getTemplatePath(type = ''): Promise<{ success: boolean, path: string }> {
    return new Promise((resolve, reject) => {
        const _type = type ? `/${type}` : ''
        const typePath = templatePath + _type
        // console.log(chalk.green(`template path =====> ${typePath}`))
        glob(typePath, {}, function (er, file) {
            if (!file.length) {
                console.log(chalk.red(`template path err ${typePath}`))
            }
            resolve({ success: !!file.length, path: file[0] })
        })
    })
}

/** 拷贝目的路径 */
function getDestinationPath(pageName = ''): Promise<{ success: boolean, path: string }> {
    return new Promise((resolve, reject) => {
        const _type = pageName ? `/${pageName}` : ''
        const path = process.cwd() + _type
        console.log(chalk.green(`destination path ${path}`))
        glob(path, {}, function (er, file) {
            resolve({ success: !!file.length, path: file[0] })
        })
    })
}

/** 设置全局的redux-config */
function writeReducer(pageName = '', reducerName: { key: boolean, value: string }[]) {
    const custom = _.filter(reducerName, item => item.key)
    if (!custom.length) {
        console.log(chalk.yellow(`reducer not custom`))
        return
    }
    let _reducerName = custom[0].value
    const reducerContent = getReducerContent()
    const reducerArr = reducerContent.split('\n')
    const pagePath = `${process.cwd()}/${pageName}`
    reducerArr.unshift(`import ${_reducerName} from \'../${pagePath.split("src/")[1]}/reducer\'`)
    const interfaceIndex = reducerArr.indexOf('export interface IReducers {')
    if (reducerContent === -1) {
        console.log(chalk.red(' ------> reducer 结构有问题，请检查'))
        return
    }
    reducerArr.splice(interfaceIndex + 1, 0, `    ${_reducerName}: any,`)
    const exportIndex = reducerArr.indexOf('const reducers: IReducers = {')
    if (exportIndex === -1) {
        console.log(chalk.red(' ------> reducer 结构有问题，请检查'))
        return
    }
    reducerArr.splice(exportIndex + 1, 0, `    ${_reducerName},`)
    const reducerStr2 = reducerArr.join('\n')
    try {
        fsExtra.writeFileSync(reducerPath, reducerStr2)
    } catch (error) {
        console.log(chalk.red(' ------> write reducer err', error))
    }
}

/** 获取全局配置的reducer */
function getReducerContent() {
    if (!fsExtra.existsSync(reducerPath)) {
        console.log(chalk.red(' ------> 为解析到', reducerPath))
        return
    }
    const reducerContent = fsExtra.readFileSync(reducerPath, "utf8")
    return reducerContent
}

/** 获取项目中所有的reducers */
function getReducer(): string[] {
    const reducerContent = getReducerContent()
    const reducerArr = reducerContent.split('\n')
    const start = _.indexOf(reducerArr, "const reducers: IReducers = {");
    const end = _.lastIndexOf(reducerArr, "}")
    const reducerA = _.slice(reducerArr, start + 1, end)
    return reducerA.map(item => {
        let _item = item.replace(/\s*/g, "").split(':')[0];
        return _item.replace(',', '');
    })
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
function setPage(pageName = '', reducerName: { key: boolean, value: string }[]) {
    const _reducerName = _.map(reducerName, item => {
        return `\'${item.value}\'`
    })
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
    pageExportStr = pageExportStr.replace(targetStr, _reducerName.join(', '))
    // console.log(chalk.green(' ===> pageExportStr', pageExportStr))
    pageArr[targetIndex] = pageExportStr
    const pageContent2 = pageArr.join('\n')
    try {
        fsExtra.writeFileSync(pagePath, pageContent2)
    } catch (error) {
        console.log(chalk.red(' ------> set page reducer err', error))
    }
}

/** 首字母大写 */
function chartUp(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}



// ------------------------------------------- component -------------------------------------


/**
 * create template component
 */
async function templateComponent() {
    const componentName = await setComponentName()
    console.log(chalk.green(`component name ${componentName}`))
    const reducers = await setComponentReducer()
    if (!reducers.success) return
    console.log(chalk.green(`component reducer `, JSON.stringify(reducers.reducerName)))
    /** 目标文件是否存在, 存在删除 */
    const destinationRes = await getDestinationPath(componentName)
    if (destinationRes.success) {
        console.log(chalk.yellow(`destination exit ==> ${destinationRes.path} `))
        try {
            await fsExtra.removeSync(destinationRes.path)
            console.log(chalk.green(`remove destination success`))
        } catch (error) {
            console.log(chalk.red(`destination remove path err ==> ${error} `))
        }
    } else {
        console.log(chalk.green(`destination path not exit`))
    }

    /** 查看模板文件 并拷贝到指定目录下*/
    const { success, path } = await getTemplatePath('component')
    if (!success) return
    if (!fsExtra.pathExistsSync(path)) {
        console.log(chalk.red(`template not exit ${path}`))
        return
    }
    console.log(chalk.green(`template path ${path}`))
    try {
        const cwd = process.cwd()
        fsExtra.copySync(path, cwd + `/${componentName}`)
        console.log(chalk.green(`copy success `))
    } catch (error) {
        console.log(chalk.red(`copy err`))
    }

    setComponent(componentName, reducers.reducerName)

}

/** set component name */
async function setComponentName(): Promise<string> {
    const promptInput = [{
        type: 'input',
        name: 'name',
        message: '请输入component名称',
    }]
    const pageNameObj = await inquirer.prompt(promptInput)
    const pageName = pageNameObj.name
    if (fsExtra.pathExistsSync(`${process.cwd()}/${pageName}`)) {
        const promptList = [{
            type: 'list',
            name: 'name',
            message: '该路径下component已经存在，请选择如何操作。 again: 重新输入; continue: 删除存在的，创建新的',
            choices: ['again', 'continue']
        }]
        let pageNameS = await inquirer.prompt(promptList)
        console.log(' ===> ', pageNameS)
        if (pageNameS.name === 'again') {
            return await setComponentName()
        } else if (pageNameS.name === 'continue') {
            return pageName
        }
    } else {
        return pageName
    }
}

/**  */
async function setComponentReducer(): Promise<{ success: boolean, reducerName?: { key: boolean, value: string }[] }> {
    const reducers = getReducer()
    console.log(chalk.green(`reducers ====>`, reducers))
    const promptReducer = [{
        type: 'checkbox',
        name: 'name',
        message: '请选择需要绑定的reducer',
        choices: reducers,
        validate: function (value) {
            console.log(' =======> value', value)
            return true
        }
    }]
    let reducerName: { key: boolean, value: string }[]
    let reducerObj: { name: string[] } = await inquirer.prompt(promptReducer)
    if (!reducerObj.name.length) {
        console.log(chalk.red(`请设置reducer name`))
        return {
            success: false
        }
    }
    reducerName = _.map(reducerObj.name, item => {
        return {
            key: false,
            value: item
        }
    })

    return {
        success: true,
        reducerName
    }
}


function setComponent(componentName, reducerNames) {
    const _reducerName = _.map(reducerNames, item => {
        return `\'${item.value}\'`
    })
    const pagePath = `${process.cwd()}/${componentName}/index.tsx`
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
    pageExportStr = pageExportStr.replace(targetStr, _reducerName.join(', '))
    // console.log(chalk.green(' ===> pageExportStr', pageExportStr))
    pageArr[targetIndex] = pageExportStr
    const pageContent2 = pageArr.join('\n')
    try {
        fsExtra.writeFileSync(pagePath, pageContent2)
    } catch (error) {
        console.log(chalk.red(' ------> set component reducer err', error))
    }
}




export default template




/**
*
* //TODO:
*   1. 覆盖 page 的时候, src/redux-config/reduers.ts 中的reducer 需要手动清理
*
*
*/