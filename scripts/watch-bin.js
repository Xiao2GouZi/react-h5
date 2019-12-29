// const chokidar = require('chokidar');

var gulp = require("gulp");
var ts = require("gulp-typescript");
const fsE = require('fs-extra')
const chalk = require("chalk");


const copy = () => {
    const paths = ["./ry/example/**"]
    return gulp.src(paths)
        .pipe(gulp.dest("./bin/example"))
}

const tsToJs = () => {
    const paths = ["./ry/**/*.ts", "!./ry/example"]
    return gulp.src(paths)
        .pipe(ts({
            // "baseUrl": "./ry",
            // "rootDir": "./ry",
            // "outDir": "./bin",
            "target": "es5",
            "allowJs": true,
            "skipLibCheck": true,
            "esModuleInterop": true,
            "allowSyntheticDefaultImports": true,
            "strict": true,
            "forceConsistentCasingInFileNames": true,
            "module": "esnext",
            "moduleResolution": "node",
            "isolatedModules": true,
            "jsx": "react",
            "experimentalDecorators": true,
            "resolveJsonModule": true,
            "noEmit": true,
        }))
        .pipe(gulp.dest("./bin"))
}


const watchBin = () => {
    const watcher = gulp.watch("./ry/**");
    const handle2 = (path) => {
        if (path.indexOf('example') >= 0) {
            copy()
        } else {
            tsToJs()
        }
    }

    const unlink = (path = '') => {
        try {
            fsE.removeSync('./bin/')
            copy()
            tsToJs()
        } catch (error) {

        }
    }

    const handle = {
        "change": handle2,
        "add": handle2,
        "unlink": unlink,
        "addDir": unlink,
        'ready': () => {
            copy()
            tsToJs()
        }
    }
    watcher.on('all', (eventType, filename) => {
        console.log(chalk.green(`files event type: [${eventType}] filename: [${filename}]`))
        handle[eventType](filename)
    })
    watcher.on('ready', function (path, stats) {
        console.log(chalk.green(`files watch ready`))
        unlink()
    })
}

watchBin()