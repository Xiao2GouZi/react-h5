

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

/** 
 * async await 包装try->catch 
 * */
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
 *  判断数据类型
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



/**
 *  数组扁平化1
 * @param arr   数组
 * @param deep  平铺成深度 2, 二维数组
 * example Util.arrFlatten1([0, 1, [2, [3, 4, {a: 1}]]], 2)
 */
export const arrFlatten1 = (arr: any[], deep = 1): any[] => {
    if (dataType(arr) !== EDataType.Array) return []
    return arr.reduce((cur, next) => {
        return dataType(next) === EDataType.Array && deep > 1 ?
            [...cur, ...arrFlatten1(next, deep - 1)] :
            [...cur, next]
    }, [])
}


/**
 *  数组扁平化2 简单数组 [1, 2, [3], [4, [5]]]
 * @param arr   数组
 * @param deep  平铺成深度 2, 二维数组
 * example   Util.arrFlatten2([0, 1, [2, [3, 4]]])
 */
export const arrFlatten2 = (arr: any[]): any[] => {
    if (dataType(arr) !== EDataType.Array) return []
    return arr.toString().split(',').map(item => +item)
}

/**
 *  数组去重
 * @param arr  数组
 * @param key  根据object里的指定参数   数组的元素不是对象,key不用传 
 *  example Util.arrUniq(singers), Util.arrUniq(singers, "id")
 */
export const arrUniq = (arr: any[], key: string = '') => {
    if (key) {
        return [...(new Map(arr.map(item => [item[key], item])).values() as any)]
    }
    return [...(new Map(arr.map(item => [item, item])).values() as any)]
}


