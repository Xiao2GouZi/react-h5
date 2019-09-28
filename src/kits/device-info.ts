
'use strict';
const agent = navigator.userAgent

/** 是否是指定的平台 */
export const isPlaform = () => {
    return {
        isWebkit: () => {      /** webkit */
            const webkitRegexp = /webkit/i;
            return agent.match(webkitRegexp);
        },
        isAndroid: () => {
            return /Android/.test(agent);
        },
        isAndroidWebview: function () {
            const androidWebviewRegExp = /Version\/[\d\.]+/;
            if (this.isAndroid()) {
                return androidWebviewRegExp.test(agent) && !this.isOperaMini();
            }
            return false;
        },
        isIOS: function () {   /** IOS */
            return /iPhone|iPod|iPad/i.test(agent);
        },
        /** IOS Firefox */
        isIOSFirefox: function () {
            return /FxiOS/i.test(agent);
        },
        /** IOS safari */
        isIOSSafari: function () {
            return this.isIOS() && this.isWebkit() && agent.indexOf('CriOS') === -1;
        },
        isGoogleSearchApp: function () {
            return /\bGSA\b/.test(agent);
        },
        /** IOS webview */
        isIOSWebview: function () {
            if (this.isIOS()) {
                if (this.isGoogleSearchApp()) {
                    return true;
                }
                return /.+AppleWebKit(?!.*Safari)/.test(agent);
            }
            return false;
        },
        /** IOS uiwebview */
        isIOSUIWebview: function () {
            return this.isIOSWebview() && !window.statusbar.visible;
        },

        /** IOS wkwebview */
        isIOSWKWebview: function () {
            return this.isIOSWebview() && window.statusbar.visible;
        },
        /** chorme */
        isChrome: function () {
            return (agent.indexOf('Chrome') !== -1 || agent.indexOf('CriOS') !== -1) && !this.isEdge() && !this.isSamsungBrowser();
        },

        /** chorme-os */
        isChromeOS: function () {
            return /CrOS/i.test(agent);
        },

        /** edge */
        isEdge: function () {
            return agent.indexOf('Edge/') !== -1;
        },

        /** samsung */
        isSamsungBrowser: function () {
            return /SamsungBrowser/i.test(agent);
        },

        /** Firefox */
        isFirefox: function () {
            return /Firefox/i.test(agent);
        },

        /** mobile firefox */
        isMobileFirefox: function () {
            return this.isIOSFirefox() || (/iPhone|iPod|iPad|Mobile|Tablet/i.test(agent) && this.isFirefox());
        },

        /** ie */
        isIE: function () {
            return agent.indexOf('MSIE') !== -1 || this.isIe11();
        },

        /** ie 9 */
        isIe9: function () {
            return agent.indexOf('MSIE 9') !== -1;
        },

        /** ie 10 */
        isIe10: function () {
            return agent.indexOf('MSIE 10') !== -1;
        },

        /** ie 11 */
        isIe11: function () {
            return agent.indexOf('Trident/7') !== -1;
        },
        /** Opera mini是一款挪威的Opera Software ASA制作的,用于在移动电话上使用的免费网络浏览器,可浏览万维网及WAP网站 */
        isOperaMini: function () {
            return agent.indexOf('Opera Mini') > -1;
        },

        isUnsupportedIOSChrome: function () {
            let match, version;
            const MINIMUM_SUPPORTED_CHROME_IOS_VERSION = 48;
            match = agent.match(/CriOS\/(\d+)\./);
            if (!match) {
                return false;
            }
            version = parseInt(match[1], 10);
            return version < MINIMUM_SUPPORTED_CHROME_IOS_VERSION;
        },

        isOldSamsungBrowserOrSamsungWebview: function () {
            return !this.isChrome() && !this.isSamsungBrowser() && /samsung/i.test(agent);
        },

        /** supports popup */
        supportsPopups: function () {
            return !(
                this.isIOSWebview() ||
                this.isIOSFirefox() ||
                this.isAndroidWebview() ||
                this.isOperaMini() ||
                this.isUnsupportedIOSChrome() ||
                this.isOldSamsungBrowserOrSamsungWebview()
            );
        },

        /** chorme 支持的版本 */
        isSupportedChromeVersion: function (version: number) {
            let match = agent.match(/Chrome\/(\d+)\./);
            if (!match) {
                return false;
            }
            let _version = parseInt(match[1], 10);
            return _version >= version;
        },

        /** support payment request */
        supportsPaymentRequestApi: function () {
            if (!PaymentRequest) {
                return false;
            }
            if (!this.isChrome()) {
                return true;
            }
            return this.isSupportedChromeVersion(61);
        },
    }
}

/**  内核 */
export const isKernel = () => {
    return {
        'Trident': agent.indexOf('Trident') > -1 || agent.indexOf('NET CLR') > -1,
        'Presto': agent.indexOf('Presto') > -1,
        'WebKit': agent.indexOf('AppleWebKit') > -1,
        'Gecko': agent.indexOf('Gecko/') > -1,
    }
}

/** 浏览器 */
export const isBrowser = () => {
    return {
        'Safari': agent.indexOf('Safari') > -1,
        'Chrome': agent.indexOf('Chrome') > -1 || agent.indexOf('CriOS') > -1,
        'IE': agent.indexOf('MSIE') > -1 || agent.indexOf('Trident') > -1,
        'Edge': agent.indexOf('Edge') > -1,
        'Firefox': agent.indexOf('Firefox') > -1 || agent.indexOf('FxiOS') > -1,
        'FirefoxFocus': agent.indexOf('Focus') > -1,
        'Chromium': agent.indexOf('Chromium') > -1,
        'Opera': agent.indexOf('Opera') > -1 || agent.indexOf('OPR') > -1,
        'Vivaldi': agent.indexOf('Vivaldi') > -1,
        'Yandex': agent.indexOf('YaBrowser') > -1,
        'Arora': agent.indexOf('Arora') > -1,
        'Lunascape': agent.indexOf('Lunascape') > -1,
        'QupZilla': agent.indexOf('QupZilla') > -1,
        'CocCoc': agent.indexOf('coc_coc_browser') > -1,
        'Kindle': agent.indexOf('Kindle') > -1 || agent.indexOf('Silk/') > -1,
        'Iceweasel': agent.indexOf('Iceweasel') > -1,
        'Konqueror': agent.indexOf('Konqueror') > -1,
        'Iceape': agent.indexOf('Iceape') > -1,
        'SeaMonkey': agent.indexOf('SeaMonkey') > -1,
        'Epiphany': agent.indexOf('Epiphany') > -1,
        '360': agent.indexOf('QihooBrowser') > -1 || agent.indexOf('QHBrowser') > -1,
        '360EE': agent.indexOf('360EE') > -1,
        '360SE': agent.indexOf('360SE') > -1,
        'UC': agent.indexOf('UC') > -1 || agent.indexOf(' UBrowser') > -1,
        'QQBrowser': agent.indexOf('QQBrowser') > -1,
        'QQ': agent.indexOf('QQ/') > -1,
        'Baidu': agent.indexOf('Baidu') > -1 || agent.indexOf('BIDUBrowser') > -1,
        'Maxthon': agent.indexOf('Maxthon') > -1,
        'Sogou': agent.indexOf('MetaSr') > -1 || agent.indexOf('Sogou') > -1,
        'LBBROWSER': agent.indexOf('LBBROWSER') > -1,
        '2345Explorer': agent.indexOf('2345Explorer') > -1,
        'TheWorld': agent.indexOf('TheWorld') > -1,
        'XiaoMi': agent.indexOf('MiuiBrowser') > -1,
        'Quark': agent.indexOf('Quark') > -1,
        'Qiyu': agent.indexOf('Qiyu') > -1,
        'Wechat': agent.indexOf('MicroMessenger') > -1,
        'Taobao': agent.indexOf('AliApp(TB') > -1,
        'Alipay': agent.indexOf('AliApp(AP') > -1,
        'Weibo': agent.indexOf('Weibo') > -1,
        'Douban': agent.indexOf('com.douban.frodo') > -1,
        'Suning': agent.indexOf('SNEBUY-APP') > -1,
        'iQiYi': agent.indexOf('IqiyiApp') > -1,
    }
}

/** 系统或平台 */
export const isSystemPlaform = () => {
    return {
        'Windows': agent.indexOf('Windows') > -1,
        'Linux': agent.indexOf('Linux') > -1 || agent.indexOf('X11') > -1,
        'MacOS': agent.indexOf('Macintosh') > -1,
        'Android': agent.indexOf('Android') > -1 || agent.indexOf('Adr') > -1,
        'Ubuntu': agent.indexOf('Ubuntu') > -1,
        'FreeBSD': agent.indexOf('FreeBSD') > -1,
        'Debian': agent.indexOf('Debian') > -1,
        'Windows Phone': agent.indexOf('IEMobile') > -1 || agent.indexOf('Windows Phone') > -1,
        'BlackBerry': agent.indexOf('BlackBerry') > -1 || agent.indexOf('RIM') > -1,
        'MeeGo': agent.indexOf('MeeGo') > -1,
        'Symbian': agent.indexOf('Symbian') > -1,
        'iOS': agent.indexOf('like Mac OS X') > -1,
        'ChromeOS': agent.indexOf('CrOS') > -1,
        'WebOS': agent.indexOf('hpwOS') > -1,
        "PC": !agent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    }
}

/** 硬件设备 */
export const isHardwareDevice = () => {
    return {
        'Mobile': agent.indexOf('Mobi') > -1 || agent.indexOf('iPh') > -1 || agent.indexOf('480') > -1,
        'Tablet': agent.indexOf('Tablet') > -1 || agent.indexOf('Nexus 7') > -1,
        'iPad': agent.indexOf('iPad') > -1
    }
}

/** 获取操作系统版本 */
export const getOSVersion = () => {
    return {
        'Windows': () => {
            const v = agent.replace(/^.*Windows NT ([\d.]+);.*$/, '$1')
            const oldWindowsVersionMap: any = {
                '6.4': '10',
                '6.3': '8.1',
                '6.2': '8',
                '6.1': '7',
                '6.0': 'Vista',
                '5.2': 'XP',
                '5.1': 'XP',
                '5.0': '2000'
            }
            return oldWindowsVersionMap[v] || v
        },
        'Android': () => {
            return agent.replace(/^.*Android ([\d.]+);.*$/, '$1')
        },
        'iOS': () => {
            return agent.replace(/^.*OS ([\d_]+) like.*$/, '$1').replace(/_/g, '.')
        },
        'Debian': () => {
            return agent.replace(/^.*Debian\/([\d.]+).*$/, '$1')
        },
        'WindowsPhone': () => {
            return agent.replace(/^.*Windows Phone( OS)? ([\d.]+);.*$/, '$2')
        },
        'MacOS': () => {
            return agent.replace(/^.*Mac OS X ([\d_]+).*$/, '$1').replace(/_/g, '.')
        },
        'WebOS': () => {
            return agent.replace(/^.*hpwOS\/([\d.]+);.*$/, '$1')
        }
    }
}

/** 获取浏览器版本 */
export const getBrowerVersion = () => {
    return {
        'Safari': () => {
            return agent.replace(/^.*Version\/([\d.]+).*$/, '$1')
        },
        'Chrome': () => {
            return agent.replace(/^.*Chrome\/([\d.]+).*$/, '$1').replace(/^.*CriOS\/([\d.]+).*$/, '$1')
        },
        'IE': () => {
            return agent.replace(/^.*MSIE ([\d.]+).*$/, '$1').replace(/^.*rv:([\d.]+).*$/, '$1')
        },
        'Edge': () => {
            return agent.replace(/^.*Edge\/([\d.]+).*$/, '$1')
        },
        'Firefox': () => {
            return agent.replace(/^.*Firefox\/([\d.]+).*$/, '$1').replace(/^.*FxiOS\/([\d.]+).*$/, '$1')
        },
        'Firefox Focus': () => {
            return agent.replace(/^.*Focus\/([\d.]+).*$/, '$1')
        },
        'Chromium': () => {
            return agent.replace(/^.*Chromium\/([\d.]+).*$/, '$1')
        },
        'Opera': () => {
            return agent.replace(/^.*Opera\/([\d.]+).*$/, '$1').replace(/^.*OPR\/([\d.]+).*$/, '$1')
        },
        'Vivaldi': () => {
            return agent.replace(/^.*Vivaldi\/([\d.]+).*$/, '$1')
        },
        'Yandex': () => {
            return agent.replace(/^.*YaBrowser\/([\d.]+).*$/, '$1')
        },
        'Arora': () => {
            return agent.replace(/^.*Arora\/([\d.]+).*$/, '$1')
        },
        'Lunascape': () => {
            return agent.replace(/^.*Lunascape[\/\s]([\d.]+).*$/, '$1')
        },
        'QupZilla': () => {
            return agent.replace(/^.*QupZilla[\/\s]([\d.]+).*$/, '$1')
        },
        'Coc Coc': () => {
            return agent.replace(/^.*coc_coc_browser\/([\d.]+).*$/, '$1')
        },
        'Kindle': () => {
            return agent.replace(/^.*Version\/([\d.]+).*$/, '$1')
        },
        'Iceweasel': () => {
            return agent.replace(/^.*Iceweasel\/([\d.]+).*$/, '$1')
        },
        'Konqueror': () => {
            return agent.replace(/^.*Konqueror\/([\d.]+).*$/, '$1')
        },
        'Iceape': () => {
            return agent.replace(/^.*Iceape\/([\d.]+).*$/, '$1')
        },
        'SeaMonkey': () => {
            return agent.replace(/^.*SeaMonkey\/([\d.]+).*$/, '$1')
        },
        'Epiphany': () => {
            return agent.replace(/^.*Epiphany\/([\d.]+).*$/, '$1')
        },
        '360': () => {
            return agent.replace(/^.*QihooBrowser\/([\d.]+).*$/, '$1')
        },
        '360SE': () => {
            const hash: any = { '63': '10.0', '55': '9.1', '45': '8.1', '42': '8.0', '31': '7.0', '21': '6.3' }
            const chrome_vision = agent.replace(/^.*Chrome\/([\d]+).*$/, '$1')
            return hash[chrome_vision] || ''
        },
        '360EE': () => {
            const hash: any = { '69': '11.0', '63': '9.5', '55': '9.0', '50': '8.7', '30': '7.5' };
            const chrome_vision = agent.replace(/^.*Chrome\/([\d]+).*$/, '$1')
            return hash[chrome_vision] || ''
        },
        'Maxthon': () => {
            return agent.replace(/^.*Maxthon\/([\d.]+).*$/, '$1')
        },
        'QQBrowser': () => {
            return agent.replace(/^.*QQBrowser\/([\d.]+).*$/, '$1')
        },
        'QQ': () => {
            return agent.replace(/^.*QQ\/([\d.]+).*$/, '$1')
        },
        'Baidu': () => {
            return agent.replace(/^.*BIDUBrowser[\s\/]([\d.]+).*$/, '$1')
        },
        'UC': () => {
            return agent.replace(/^.*UC?Browser\/([\d.]+).*$/, '$1')
        },
        'Sogou': () => {
            return agent.replace(/^.*SE ([\d.X]+).*$/, '$1').replace(/^.*SogouMobileBrowser\/([\d.]+).*$/, '$1')
        },
        'LBBROWSER': () => {
            const hash: any = { '57': '6.5', '49': '6.0', '46': '5.9', '42': '5.3', '39': '5.2', '34': '5.0', '29': '4.5', '21': '4.0' };
            const chrome_vision = navigator.userAgent.replace(/^.*Chrome\/([\d]+).*$/, '$1');
            return hash[chrome_vision] || '';
        },
        '2345Explorer': () => {
            return agent.replace(/^.*2345Explorer\/([\d.]+).*$/, '$1')
        },
        'TheWorld': () => {
            return agent.replace(/^.*TheWorld ([\d.]+).*$/, '$1')
        },
        'XiaoMi': () => {
            return agent.replace(/^.*MiuiBrowser\/([\d.]+).*$/, '$1')
        },
        'Quark': () => {
            return agent.replace(/^.*Quark\/([\d.]+).*$/, '$1')
        },
        'Qiyu': () => {
            return agent.replace(/^.*Qiyu\/([\d.]+).*$/, '$1')
        },
        'Wechat': () => {
            return agent.replace(/^.*MicroMessenger\/([\d.]+).*$/, '$1')
        },
        'Taobao': () => {
            return agent.replace(/^.*AliApp\(TB\/([\d.]+).*$/, '$1')
        },
        'Alipay': () => {
            return agent.replace(/^.*AliApp\(AP\/([\d.]+).*$/, '$1')
        },
        'Weibo': () => {
            return agent.replace(/^.*weibo__([\d.]+).*$/, '$1')
        },
        'Douban': () => {
            return agent.replace(/^.*com.douban.frodo\/([\d.]+).*$/, '$1')
        },
        'Suning': () => {
            return agent.replace(/^.*SNEBUY-APP([\d.]+).*$/, '$1')
        },
        'iQiYi': () => {
            return agent.replace(/^.*IqiyiVersion\/([\d.]+).*$/, '$1')
        }
    }
}

/** 是否竖屏  true 竖屏  false 横屏 */
export const isOrientation = () => {
    return window.matchMedia("(orientation: portrait)").matches
}

/** 获取网络 */
export const getNetwork = () => {
    let _navigator: any = navigator
    return _navigator.connection.effectiveType
}