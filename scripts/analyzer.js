
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