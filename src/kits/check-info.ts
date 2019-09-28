/**
* @description 判断经纬度合法性
* @param latitude 纬度
* @param longitude 经度
*/
export const checkedLangLat = (position: { latitude: string, longitude: string }): boolean => {
    const longrg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/
    const latreg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/
    let flag = true
    if (!latreg.test(position.latitude) || !longrg.test(position.longitude)) {
        flag = false
    }
    return flag
}

/** 身份证校验 */
export const checkIDCard = (id: string): boolean => {
    //第一代身份证正则表达式(15位)
    const firstG = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
    //第二代身份证号码正则
    const secondG = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    if (id.length === 18) {
        return secondG.test(id)
    }
    return firstG.test(id)
}

/** 校验邮箱 */
export const checkEmail = (email: string): boolean => {
    const reg = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
    return reg.test(email)
}

/** 校验车牌 */
export const checkCardLicense = (str: string): boolean => {
    const reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
    return reg.test(str)
}

/** 校验护照 */
export const checkIdentification = (str: string): boolean => {
    const reg = /^(P\d{7}|G\d{7,8}|TH\d{7,8}|S\d{7,8}|A\d{7,8}|L\d{7,8}|\d{9}|D\d+|1[4,5]\d{7})$/;
    return reg.test(str)
}

/** 校验固定电话 */
export const checkTelephone = (str: string): boolean => {
    let reg = /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{8}/;
    return reg.test(str)
}

/** 校验邮编 */
export const checkPostalCode = (str: string): boolean => {
    let reg = /[1-9]{1}(\d+){5}/;
    return reg.test(str)
}

/** 特殊字符 */
export const checkSpecialCharacter = (str: string): boolean => {
    const reg = /["'<>%;)(&+]+-!！@#$~/;
    return reg.test(str)
}

/** 校验纯数字 */
export const checkDigital = (str: string) => {
    const reg = /^[0-9]+.?[0-9]*$/
    return reg.test(str)
}