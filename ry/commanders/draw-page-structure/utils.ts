#!/usr/bin/env node

const ora = require('ora');
const emoji = require('node-emoji');

const appName = "dps";

const likeLinux =  process.env.TERM === 'cygwin' || process.platform !== 'win32';

const genArgs = {
  // {name: {type, value}}
  // appName-name-type:value
  prefixName: `${appName}-`,
  create(args) {
    if(getAgrType(args) !== 'object') return;
    return Object.keys(args).map(item => {
      const {type, value} = args[item];
      return `${this.prefixName + item }-${type}:${value}`;
    });
  }
}

function calcText(str) {
  if(str.length > 40) {
      return str.slice(0, 15) + '...' + (str.match(/([\/\\][^\/\\]+)$/) || ['', ''])[1];
  }
  return str;
}

function getAgrType(agr) {
  return Object.prototype.toString.call(agr).split(/\s/)[1].slice(0, -1).toLowerCase();
}

function Spinner(color) {
  let opt = likeLinux? {
    spinner: {
      "interval": 125,
      "frames": [
        "∙∙∙",
        "●∙∙",
        "∙●∙",
        "∙∙●",
        "∙∙∙"
      ]
    }
  }: '';
  const spinner = ora(opt).start();
  spinner.color = color;
  return spinner;
}

const emoji_get = emoji.get.bind(emoji);
emoji.get = function() {
  return !likeLinux? '·': emoji_get.apply(emoji, arguments);
}

export {
    calcText,
    getAgrType,
    Spinner,
    emoji,
    genArgs
}



