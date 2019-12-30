#!/usr/bin/env node

const fsExtra = require('fs-extra')
const path = require('path');
const cheerio = require('cheerio');
const chalk = require('chalk');


import * as Utils from './utils'
import * as DefConf from './default.config'
import EvalScripts from './eval-dom'
import PPTeer from './pp'
import DefaultHtml from './default.html'



const resolveDir = dir => path.join(__dirname, "../../../", dir);
const resolveCwd = dir => path.resolve(process.cwd(), dir);

const currDir = process.cwd();

interface IProps {
    url: string,
    targetFile: string,
    background: string,
    animation: string,
    rootNode: string,
    header: string,
    device: string,
    headless: boolean,
    extraHTTPHeaders: string,
    writePageStructure: (html: { [key: string]: string }, filepath: string) => void,
    includeElement: string,
    init: string
}

class DrawPageStructure {
    url: string;
    filepath: string;
    background: string;
    animation: string;
    rootNode: string | string[];
    header: string;
    device: string;
    headless: boolean;
    extraHTTPHeaders: any;
    writePageStructure: (html: { [key: string]: string }, filepath: string) => void;
    includeElement: any;
    init: any
    constructor(props: IProps) {
        const { url, targetFile, background, animation, rootNode, header, device, headless, extraHTTPHeaders, writePageStructure, includeElement, init } = props
        this.url = url;
        this.filepath = targetFile;
        // this.injectSelector = "app" || 'body';
        this.background = background || '#ecf0f2';
        this.animation = animation || '';
        this.rootNode = rootNode || '';
        this.header = header || '';
        this.device = device;
        this.headless = headless;
        this.extraHTTPHeaders = extraHTTPHeaders;
        this.writePageStructure = writePageStructure;
        this.includeElement = includeElement || function () { };
        this.init = init || function () { };


        if (this.headless === undefined) this.headless = true;

        if (!url) {
            console.log(chalk.red('please provide entry url !'))
        }
        if (header && Utils.getAgrType(header) !== 'object') {
            console.log(chalk.red('[header] should be an object !'))
        }


    }
    async generateSkeletonHTML(page): Promise<{ css: string, html: { [key: string]: string } }> {
        let html = { css: '', html: {} };

        try {
            // html = await page.evaluate.call(
            //   page, 
            //   evalScripts, 
            //   this.init.toString(), 
            //   this.includeElement.toString(), 
            //   this.background, 
            //   this.animation,
            //   this.rootNode,
            //   this.header
            // );
            let genArgs = {
                init: {
                    type: 'function',
                    value: this.init.toString()
                },
                includeElement: {
                    type: 'function',
                    value: this.includeElement.toString()
                },
                background: {
                    type: 'string',
                    value: this.background
                },
                animation: {
                    type: 'string',
                    value: this.animation
                },
                rootNode: {
                    type: 'string',
                    value: this.rootNode
                },
                header: {
                    type: 'object',
                    value: JSON.stringify(this.header)
                }
            }
            if (Utils.getAgrType(this.rootNode) === 'array') {
                genArgs.rootNode.value = JSON.stringify(this.rootNode)
                genArgs.rootNode.type = 'array'
            }
            const agrs = Utils.genArgs.create(genArgs);
            agrs.unshift(EvalScripts as any);
            html = await page.evaluate.apply(page, agrs);
        } catch (e) {
            console.log(chalk.red('\n[page.evaluate] ' + e.message))
        }
        console.log(' ====> html', html)
        return html;

    }
    writeToFilepath(filepath, html) {
        try {
            let fileHTML = fsExtra.readFileSync(`${filepath}/index.tsx`, 'utf-8');
            const start = fileHTML.indexOf('><') + 1
            let targetHtml = `${fileHTML.slice(0, start)}\n${html}${fileHTML.slice(start)}`
            // console.log(' ====> targetHtml', targetHtml)
            fsExtra.writeFileSync(`${filepath}/index.tsx`, targetHtml);
            console.log(chalk.green(` write html success`))
        } catch (error) {
            console.log(chalk.red(` write html fail ${error}`))
        }
    }

    writeCss(filepath, css) {
        const walkingPath = path.join(__dirname, "../../", 'walking/structure/index.module.less')
        try {
            let fileCss = fsExtra.readFileSync(walkingPath, 'utf-8');
            fsExtra.writeFileSync(`${filepath}/index.module.less`, fileCss + css);
            console.log(chalk.green(` write css success`))
        } catch (error) {
            console.log(chalk.red(` write css fail`))
        }
    }


    async start() {
        const pageUrl = this.url;
        const spinner = Utils.Spinner('magentaBright');

        spinner.text = '启动浏览器...';
        const pp = await PPTeer({
            device: this.device,
            headless: this.headless
        });

        spinner.text = `正在打开页面：${pageUrl}...`;
        const page = await pp.openPage(pageUrl, this.extraHTTPHeaders);

        spinner.text = '正在生成骨架屏...';
        const html = await this.generateSkeletonHTML(page);

        const userWrite = Utils.getAgrType(this.writePageStructure) === 'function';

        if (userWrite) {
            this.writePageStructure(html.html, this.filepath);
        }
        // console.log(' ====> ', JSON.stringify(Object.keys(html.html)))
        // console.log(' ====> ', this.filepath)
        Object.keys(html.html).forEach(item => {
            const _item = item.replace("#", "")
            /** 把默认文件copy指定目录 */
            const walkingPath = path.join(__dirname, "../../", 'walking/structure')
            try {
                const _targetFile = `${this.filepath}/${_item}`
                if (!fsExtra.existsSync(_targetFile)) {
                    console.log(chalk.yellow(` target file path:404 [${_targetFile}]`))
                    console.log(chalk.green(` target file path create ...`))
                    fsExtra.ensureDirSync(_targetFile)
                    console.log(chalk.green(` target file path create success`))
                }
                console.log(chalk.green(` copy file start`))
                fsExtra.copySync(`${walkingPath}/`, _targetFile)
                console.log(chalk.green(` copy file start success`))
                this.writeToFilepath(_targetFile, html.html[item]);
                this.writeCss(_targetFile, html.css)
            } catch (error) {
                console.log(chalk.red(`copy walking structure err ${error}`))
            }
        })
        spinner.clear().succeed(`skeleton screen has created and output to ${Utils.calcText(this.filepath)}`);
        if (this.headless) {
            await pp.browser.close();
            process.exit(0);
        }
    }
}



function getDpsconfig() {
    const dpsConfFile = resolveDir(DefConf.filename)
    console.log(' =====> ', dpsConfFile)
    if (!fsExtra.existsSync(dpsConfFile)) {
        return console.log(chalk.red(`please run 'dps init' to initialize a config file`))
    }
    return require(dpsConfFile);
}

export default function DpsStatr() {
    const dpsConfig = getDpsconfig()
    console.log(chalk.green(` dps defalut config`), dpsConfig)
    const targetFile = resolveCwd('components/skeleton')
    try {
        if (!fsExtra.existsSync(targetFile)) {
            console.log(chalk.yellow(` target file path:404 [${targetFile}]`))
            console.log(chalk.green(` target file path create ...`))
            fsExtra.ensureDirSync(targetFile)
            console.log(chalk.green(` target file path create success`))
        }
        if (!fsExtra.statSync(targetFile).isDirectory()) {
            console.log(chalk.red(` target file path exist and not directory`))
            return
        }
    } catch (error) {
        console.log(chalk.red(` target file path create fail [${error}]`))
    }
    console.log(chalk.green(` target file path [${targetFile}]`))
    dpsConfig.targetFile = targetFile
    new DrawPageStructure(dpsConfig).start()
}
