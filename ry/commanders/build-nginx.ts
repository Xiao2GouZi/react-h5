
const chalk = require("chalk");
const path = require("path");
const fsExtra = require('fs-extra')
const inquirer = require('inquirer');
const _ = require('loadsh')


const resolve = dir => path.join(__dirname, "../../", dir);


// 项目中build路径
const buildPath = resolve(`build/`)
// nginx config配置的路径
const nginxPath = '/Users/bank/Desktop/nginx/'


async function buildNginx(cwd) {
    let _projectName = ''
    if (cwd.init) {
        const { success, projectName } = await initCondition()
        if (!success) {
            console.log(chalk.red('set nginx project err'))
            return
        }
        console.log(chalk.green('nginx project name', projectName))
        _projectName = nginxPath + projectName
    } else if (cwd.select) {
        const { success, projectName } = await selectCondition()
        if (!success) {
            console.log(chalk.red('set nginx project err'))
            return
        }
        _projectName = nginxPath + projectName
    } else {
        _projectName = nginxPath + 'demo'
    }
    // 判断是否存在当前build路径，没有直接终止
    if (!fsExtra.existsSync(buildPath)) {
        console.log(chalk.red('build not found, please npm run build'))
        return
    }
    // 判断是否存在当前build路径，没有直接终止
    if (!fsExtra.existsSync(_projectName)) {
        try {
            fsExtra.mkdirpSync(_projectName)
            console.log(chalk.green('create nginx project success', _projectName))
        } catch (error) {
            console.log(chalk.red('create nginx project success', _projectName))
        }
    }
    console.log(chalk.green('copy from ===> ', buildPath))
    console.log(chalk.green('copy to ===> ', _projectName))
    try {
        fsExtra.removeSync(_projectName + '*')
        console.log(chalk.green('remove target file success'))
    } catch (error) {
        console.log(chalk.red('remove target file err', error))
    }
    try {
        fsExtra.copySync(buildPath, _projectName)
        console.log(chalk.green('copy target file success'))
    } catch (error) {
        console.log(chalk.red('copy target file err', error))
    }
}


/** init nginx project */
async function initCondition(): Promise<{ success: boolean, projectName?: string }> {
    let projectName = ''
    try {
        const promptInput = [{
            type: 'input',
            name: 'name',
            message: 'please init nginx project name',
        }]
        const promptRes = await inquirer.prompt(promptInput)
        projectName = promptRes.name
        console.log(chalk.green('nginx project name', projectName))
        const files: string[] = fsExtra.readdirSync(nginxPath)
        console.log(chalk.green('nginx project files', files))
        if (_.indexOf(files, projectName) >= 0) { //  项目名字存在
            const promptList = [{
                type: 'list',
                name: 'name',
                message: `${projectName} 已在Nginx中 做出选择`,
                choices: ['overrid', 'again']
            }]
            let promptS = await inquirer.prompt(promptList)
            if (promptS.name === 'overrid') {
                return { success: true, projectName: projectName }
            } else {
                return await initCondition()
            }
        } else {
            return { success: true, projectName: projectName }
        }
    } catch (error) {
        console.log(chalk.green('set nginx project name err', error))
        return { success: false }
    }
}

/** select existing project */
async function selectCondition(): Promise<{ success: boolean, projectName?: string }> {
    try {
        const files: string[] = fsExtra.readdirSync(nginxPath)
        const promptSelectP = [{
            type: 'list',
            name: 'name',
            message: `create nginx project! add -> add new; select -> select existing`,
            choices: files
        }]
        let setProjectRes = await inquirer.prompt(promptSelectP)
        return { success: true, projectName: setProjectRes.name }
    } catch (error) {
        return { success: false, projectName: '' }
    }
}


export default buildNginx