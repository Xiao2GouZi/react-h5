
/**
 * object 拼接到url后
 */
export const urlQuery = (param: any) => {
    const arr = [];
    for (const i in param) {
        if (param.hasOwnProperty(i)) {
            arr.push(encodeURIComponent(i) + "=" + encodeURIComponent(param[i]));
        }
    }
    return arr.join("&");
};

/**
 * url-query转成object
 */
export const urlObject = (url: string) => {
    const param = url.split('?')[1].split('&');
    const res: any = {};
    param.forEach(item => {
        const str = item.split('=');
        if (str[0] !== '') {
            res[str[0]] = str[1];
        }
    });
    return res;
};

/** async await 包装try->catch */
export async function errCaptured<T = any>(asyncFunc: any): Promise<{ res: T, err: any }> {
    try {
        let res = await asyncFunc()
        return { res, err: null }
    } catch (err) {
        return { res: {} as T, err }
    }
}


let globalLastTapTime = 0;
/**
 *  解决重复点击
 * */
export const preventMoreTap = () => {
    let globaTime = globalLastTapTime;
    let time = new Date().getTime();
    globalLastTapTime = time;
    return Math.abs(time - globaTime) < 400 && globaTime !== 0
}

/** 去除空格 */
export const removeAllSpace = (str: string) => {
    return str.replace(/\s+/g, "");
}

export enum EDataType {
    String = 'String',
    Object = 'Object',
    Array = 'Array',
    Function = 'Function',
    Number = 'Number',
    Boolean = 'Boolean',
    Null = 'Null',
    Undefined = 'Undefined',
    RegExp = 'RegExp',
    Date = 'Date'
}

/**
 *  数据类型
 *
 *  ''        ---->   String
 *  {}        ---->   Object
 *  []        ---->   Array
 *  () => {}  ---->   Function
 *  1         ---->   Number
 *  false     ---->   Boolean
 *  null      ---->   Null
 *  undefined ---->   Undefined
 *            ---->   Undefined
 *  /at/      ---->   RegExp
 *  new Date()---->   Date
 *
 */
export const dataType = (data: any): EDataType => {
    const stringPro = Object.prototype.toString.call(data);
    const type = stringPro.split(' ')[1];
    return type.slice(0, type.length - 1) as EDataType
};

