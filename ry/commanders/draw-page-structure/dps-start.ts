#!/usr/bin/env node

const fsExtra = require('fs-extra')
const path = require('path');
const cheerio = require('cheerio');


import * as Utils from './utils'
import DefConf from './default.config'
import EvalScripts from './eval-dom'
import PPTeer from './pp'
import DefaultHtml from './default.html'



const resolveDir = dir => path.join(__dirname, "../../../", dir);
const resolveCwd = dir => path.resolve(process.cwd(), dir);

const currDir = process.cwd();

interface IProps {
    url: string,
    output: any,
    background: string,
    animation: string,
    rootNode: string,
    header: string,
    device: string,
    headless: boolean,
    extraHTTPHeaders: string,
    writePageStructure: string,
    includeElement: string,
    init: string
}

class DrawPageStructure {
    url: string;
    filepath: string;
    injectSelector: string;
    background: string;
    animation: string;
    rootNode: string;
    header: string;
    device: string;
    headless: boolean;
    extraHTTPHeaders: any;
    writePageStructure: any;
    includeElement: any;
    init: any
    constructor(props: IProps) {
        const { url, output, background, animation, rootNode, header, device, headless, extraHTTPHeaders, writePageStructure, includeElement, init } = props
        // let filepath = !output.filepath || path.isAbsolute(output.filepath) ? output.filepath : path.join(currDir, output.filepath);
        this.url = url;
        this.filepath = !output.filepath || path.isAbsolute(output.filepath) ? output.filepath : path.join(currDir, output.filepath);
        this.injectSelector = output.injectSelector || 'body';
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
            Utils.log.error('please provide entry url !', 1);
        }
        // if(!output.filepath) {
        //   log.error('please provide output filepath !', 1); 
        // }
        if (header && Utils.getAgrType(header) !== 'object') {
            Utils.log.error('[header] should be an object !', 1);
        }

        if (this.filepath) {
            if (!fsExtra.existsSync(this.filepath)) {
                Utils.log.error('[output.filepath:404] please provide the output filepath !', 1);
            } else {
                const fileStat = fsExtra.statSync(this.filepath);
                if (fileStat.isDirectory()) {
                    this.filepath = path.join(this.filepath, 'index.html');
                    fsExtra.writeFileSync(this.filepath, DefaultHtml);
                    this.filepath = this.filepath;
                }
            }
        }
    }
    async generateSkeletonHTML(page) {
        let html = '';

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
            const agrs = Utils.genArgs.create({
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
            });
            agrs.unshift(EvalScripts as any);

            html = await page.evaluate.apply(page, agrs);

        } catch (e) {
            Utils.log.error('\n[page.evaluate] ' + e.message);
        }
        return html;

    }
    writeToFilepath(filepath, html) {
        let fileHTML = fsExtra.readFileSync(filepath);
        let $ = cheerio.load(fileHTML, {
            decodeEntities: false
        });
        $(this.injectSelector).html(html);
        fsExtra.writeFileSync(filepath, $.html('html'));
    }
    async start() {
        const pageUrl = this.url;
        const spinner = Utils.Spinner('magentaBright');

        spinner.text = '启动浏览器...';
        const pp = await PPTeer({
            device: this.device,
            headless: this.headless
        });

        // console.log(' =======> pp', pp)

        spinner.text = `正在打开页面：${pageUrl}...`;
        const page = await pp.openPage(pageUrl, this.extraHTTPHeaders);

        // console.log(' ======> page', page.evaluate)

        spinner.text = '正在生成骨架屏...';
        const html = await this.generateSkeletonHTML(page);
        const userWrite = Utils.getAgrType(this.writePageStructure) === 'function';

        if (userWrite) {
            this.writePageStructure(html, this.filepath);
        }

        if (this.filepath) {
            this.writeToFilepath(this.filepath, html);
        }

        if (!userWrite && !this.filepath) {
            const defaultPage = path.join(currDir, 'index.html');
            fsExtra.writeFileSync(defaultPage, DefaultHtml);
            this.writeToFilepath(defaultPage, html);
            this.filepath = defaultPage;
            spinner.clear();
            Utils.log.warn(`\nskeleton has created in a default page: ${defaultPage}`);
        }

        spinner.clear().succeed(`skeleton screen has created and output to ${Utils.calcText(this.filepath)}`);

        if (this.headless) {
            await pp.browser.close();
            process.exit(0);
        }
    }
}



function getDpsconfig() {
    const dpsConfFile = resolveCwd(DefConf.filename)
    if (!fsExtra.existsSync(dpsConfFile)) {
        return Utils.log.error(`please run 'dps init' to initialize a config file`, 1)
    }
    return require(dpsConfFile);
}

export default function DpsStatr() {
    const dpsConfig = getDpsconfig()
    console.log(' ======> dpsConfig', dpsConfig)
    new DrawPageStructure(dpsConfig).start()
}
