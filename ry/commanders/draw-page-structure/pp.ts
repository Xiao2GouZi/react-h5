#!/usr/bin/env node

const ppteer = require('puppeteer');

// const { log, getAgrType } = require('./utils');
import * as Utils from './utils'

const devices = {
  mobile: [375, 667, 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'],
  ipad: [1024, 1366, 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1'],
  pc: [1200, 1000, 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1']
};

export default async function pp({device = 'mobile', headless = true}) {
  const browser = await ppteer.launch({headless});
  
  async function openPage(url, extraHTTPHeaders) {
    const page = await browser.newPage();
    try{
      let deviceSet = devices[device];
      page.setUserAgent(deviceSet[2]);
      page.setViewport({width: deviceSet[0], height: deviceSet[1]});

      page.on('console', msg => {
        console.log('PAGE LOG:', msg.text())
      });


      if(extraHTTPHeaders && Utils.getAgrType(extraHTTPHeaders) === 'object') {
        await page.setExtraHTTPHeaders(new Map(Object.entries(extraHTTPHeaders)));
      }
      await page.goto(url, {
        timeout: 2 * 60 * 1000,
        waitUntil: 'networkidle0'
      });
    }catch(e){
      console.log('\n');
      Utils.log.error(e.message);
    }
    return page;
  }
  return {
    browser,
    openPage
  }
};


// const ppteer = require('puppeteer');
// // const { log, getAgrType } = require('./utils');
// // const insertBtn = require('../insertBtn');
// import * as Utils from './utils'


// const devices = {
//   mobile: [375, 667, 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'],
//   ipad: [1024, 1366, 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1'],
//   pc: [1200, 1000, 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1']
// };

// export default async function pp({device = 'mobile', headless = true, showInitiativeBtn = false}) {

//   const browser = await ppteer.launch({headless});//返回browser实例

//   async function openPage(url, extraHTTPHeaders) {
//     const page = await browser.newPage();
//     let timeHandle = null;

//    if(showInitiativeBtn){
//     browser.on('targetchanged', async ()=>{//监听页面路由变化，并获取当前标签页的最新的页面，在showInitiativeBtn为true时插入按钮由开发控制主动生成骨架屏
//       const targets = await browser.targets();
//       const currentTarget = targets[targets.length - 1]
//       const currentPage = await currentTarget.page();

//       clearTimeout(timeHandle)
//       setTimeout(()=>{
//         if(currentPage){
// //           currentPage.evaluate(insertBtn);
//         }
//       },300)
//     })
//    }
//     try{
//       let deviceSet = devices[device];
//       page.setUserAgent(deviceSet[2]);
//       page.setViewport({width: deviceSet[0], height: deviceSet[1]});

//       if(extraHTTPHeaders && Utils.getAgrType(extraHTTPHeaders) === 'object') {
//         await page.setExtraHTTPHeaders(new Map(Object.entries(extraHTTPHeaders)));
//       }
//       await page.goto(url, {
//         waitUntil: 'networkidle0'//不再有网络连接时触发（至少500ms后）
//       });
//     }catch(e){
//       console.log('\n');
//       Utils.log.error(e.message);
//     }
//     return page;
//   }
//   return {
//     browser,
//     openPage
//   }
// };





