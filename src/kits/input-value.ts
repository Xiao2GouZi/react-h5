import { useState, useCallback } from 'react'


interface IUseInputValueParam {
    /** 初始值 */
    initialValue: string,
    /** 处理value*/
    pretreatment: (value: string) => string
}

interface IUseInputValue {
    value: string,
    onChange: (e: any) => void
}

/**
 * 监听input输入框变化
 * @param param 
 */
export function useInputValue(param: IUseInputValueParam): IUseInputValue {
    let [value, setValue] = useState(param.initialValue);
    let onChange = useCallback(function (event) {
        const value = param.pretreatment(event.currentTarget.value)
        setValue(value);
    }, []);
    return {
        value,
        onChange,
    };
}


/**
 *  usage
 * 
 * import useInputValue from '@rehooks/input-value';
 * function MyComponent() {
 *  let name = useInputValue('Jamie');
 *  // name = { value: 'Jamie', onChange: [Function] }
 * return <input {...name}/>;
 * }
 * 
 */