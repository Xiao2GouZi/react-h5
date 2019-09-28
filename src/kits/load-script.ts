
import * as DeviceInfo from './device-info'

const loadScript = () => {
    /** 根据版本加载 viewport-units-buggyfill*/
    loadViewportUnitsBuggyFill()
    /** 开启consle  */
    loadVConsle()
}

const loadVConsle = () => {
    if (process.env.NODE_ENV !== 'production' && process.env.REACT_APP_V_CONSLO === 'true') {
        const VConsole = require('vconsole')
        new VConsole()
      }
}

/** vh, vw, vmin, vmax  支持 */
const loadViewportUnitsBuggyFill = () => {
    let needLoad = false
    /** ios 低于8不支持 vw, vh, vmin, vmax */
    if (DeviceInfo.isSystemPlaform().iOS) {
        const version = DeviceInfo.getOSVersion().iOS()
        const _fVersion = version.split('.')[0]
        needLoad = Number(_fVersion) < 8
    }

    /** andorid 低于4.4不支持 vw, vh, vmin, vmax */
    if (DeviceInfo.isSystemPlaform().Android) {
        const version = DeviceInfo.getOSVersion().Android()
        const versionArr = version.split('.')
        const _fVersion = versionArr[0],
            _sVersion = versionArr[1]
        needLoad = Number(_fVersion) < 4 || Number(_fVersion) === 4 && Number(_sVersion) < 4
    }

    /** pc */
    if (DeviceInfo.isSystemPlaform().PC) {
        /** ie 不支持 */
        if (DeviceInfo.isBrowser().IE) {
            needLoad = true
        }
        /** edge 16 之前的版本不支持 */
        if (DeviceInfo.isBrowser().Edge) {
            const version = DeviceInfo.getBrowerVersion().Edge()
            const _fVersion = version.split('.')[0]
            needLoad = Number(_fVersion) < 16
        }
        /** firefox 低于19版本不支持 */
        if (DeviceInfo.isBrowser().Firefox) {
            const version = DeviceInfo.getBrowerVersion().Firefox()
            const _fVersion = version.split('.')[0]
            needLoad = Number(_fVersion) < 19
        }
        /** chorme 低于26版本不支持 */
        if (DeviceInfo.isBrowser().Chrome) {
            const version = DeviceInfo.getBrowerVersion().Chrome()
            const _fVersion = version.split('.')[0]
            needLoad = Number(_fVersion) < 26
        }
        /** safari 低于6.1版本不支持 */
        if (DeviceInfo.isBrowser().Safari) {
            const version = DeviceInfo.getBrowerVersion().Safari()
            const _fVersion = version.split('.')[0]
            needLoad = Number(_fVersion) <= 6
        }
        /** Opera 低于15版本不支持 */
        if (DeviceInfo.isBrowser().Opera) {
            const version = DeviceInfo.getBrowerVersion().Opera()
            const _fVersion = version.split('.')[0]
            needLoad = Number(_fVersion) <= 6
        }
    }
    console.log(' -------> needLoad', needLoad)
    if (needLoad) {
        const hacks = require('viewport-units-buggyfill/viewport-units-buggyfill.hacks');
        const viewportUnitsBuggyfill = require('viewport-units-buggyfill');
        viewportUnitsBuggyfill.init({
            hacks,
        });
    }
}

export default loadScript