/**
 * 网络层封装
 */

import Config from '@config';
import { urlQuery } from './utils'


interface IRequestCommonParam {
    url: string,
    init?: RequestInit,
    body?: any
}

interface IResponse {
    data: any;
    status: number;
    message: string;
    code: string
}


interface IAsyncResult<T> {
    res: T;
    code: string      //   超时,网络错误是-1
    err: any;
}

async function common<T = any>(param: IRequestCommonParam): Promise<IAsyncResult<T>> {
    return await Promise.race([requestTimeOut(), request(param)]);
}


function requestTimeOut<T = any>(): Promise<IAsyncResult<T>> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ res: {} as T, code: '-1', err: '网络请求失败,请检查网络' })
        }, Config.requestTimeOut * 1000)
    })
};

async function request<T = any>(param: IRequestCommonParam): Promise<IAsyncResult<T>> {
    const headers: HeadersInit = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };
    const request: RequestInit = {
        // 'mode': 'cors',
        headers,
        ...param.init,
    };
    console.log(' --- > url', param.url)
    console.log(' --- > body', param.body)
    console.log(' --- > init', param.init)

    try {
        const response = await fetch(param.url, request);
        const responseData: { errorCode: number, resultValue: any, errorMessage: string, successful: boolean } = await response.json();
        console.log('response', param.url, responseData);
        const { errorCode, resultValue, errorMessage, successful } = responseData;
        const ret = {
            res: successful ?  (resultValue && resultValue.result) || {} : {} as T,
            code: `${errorCode}`,
            err: !successful ? errorMessage : '',
        };
        return ret;
    } catch (err) {
        console.log(' ---- err', err)
        const res = { res: {} as T, code: '-1', err: '网络请求失败,请检查网络' };
        return res;
    }
}


const Post = <T = any>(param: IRequestCommonParam): Promise<IAsyncResult<T>> => {
    return common<T>({
        url: param.url,
        init: param.init ? param.init : {
            method: 'POST',
            body: param.body
        }
    })
};

const Delete = <T = any>(param: IRequestCommonParam): Promise<IAsyncResult<T>> => {
    return common<T>({
        url: param.url,
        init: param.init ? param.init : {
            method: 'DELETE',
            body: JSON.stringify(param.body)
        }
    });
};

/**
 * Put
 */
const Put = <T = any>(param: IRequestCommonParam): Promise<IAsyncResult<T>> => {
    return common<T>({
        url: param.url,
        init: param.init ? param.init : {
            method: 'PUT',
            body: JSON.stringify(param.body)
        }
    });
};

/**
 * GET
 */
const Get = <T = any>(param: IRequestCommonParam): Promise<IAsyncResult<T>> => {
    const url = param.body ? `${param.url}?${urlQuery(param.body)}` : param.url;
    return common<T>({
        url,
        init: param.init ? param.init : {
            method: 'GET'
        }
    });
}


export default {
    common,
    Post,
    Get,
    Delete,
    Put,
};
