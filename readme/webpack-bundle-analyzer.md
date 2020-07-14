
 ### 分析工具
    
  #### 插件
    webpack-bundle-analyzer

  #### webpack.config 配置
    
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

    plugins:[
        ...
        process.env.BUNDLE_ANALYZ === 'true' && new BundleAnalyzerPlugin(webpackBundleAnalyzerConfig),
        ...
    ]

  #### package.json -> script
    
    "start:analyzer": "concurrently \"cross-env BUNDLE_ANALYZ_EVN=dev node scripts/analyzer.js\" \"rm -rf dist/ && cross-env BUNDLE_ANALYZ=true npm run start:demo\"",
    "build:analyzer": "cross-env BUNDLE_ANALYZ=true BUNDLE_ANALYZ_EVN=build npm run build && node scripts/analyzer.js"


  #### script -> analyzer
    const { runInTerminal } = require('run-in-terminal');
    const watch = require('node-watch');
    const fsExtra = require('fs-extra')


    if (process.env.BUNDLE_ANALYZ_EVN === "dev") {
        watch('./', { recursive: true, filter: /\.json$/ }, function (evt, name) {
            if (evt === 'update' && name === 'dist/stats.json') {
                const pathStats = "./dist/stats.json"
                const statsContent = fsExtra.readFileSync(pathStats, "utf8")
                if (statsContent.length < 2) return
                runInTerminal(
                    `node node_modules/.bin/webpack-bundle-analyzer ${pathStats}`,
                    null,
                    {
                        cwd: process.cwd()
                    })
            }
        });
    } else {
        runInTerminal(
            'node node_modules/.bin/webpack-bundle-analyzer ./build/stats.json',
            null,
            {
                cwd: process.cwd()
            })
    }    




