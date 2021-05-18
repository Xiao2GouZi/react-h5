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
 * import React, { memo } from 'react' 
 * import { InputItem } from 'antd-mobile' 
 * import { InputValue } from '@kits' 
 * 
 * interface IProps { }
 * const Index: React.FC = (props: IProps) => {
 *  const inputProps = InputValue.useInputValue({
 *  initialValue: '123',
 *  pretreatment: (value: string) => {
 *      // 预处理
 *      return value
 *  }
 * })
 *  return <React.Fragment>
 *  <InputItem {...inputProps} />
 *  </React.Fragment>
 * }
 * export default memo(Index) 
 * 
 */
export function useInputValue(param: IUseInputValueParam): IUseInputValue {
    let [value, setValue] = useState(param.initialValue);
    let onChange = useCallback(function (event) {
        const value = param.pretreatment(event)
        setValue(value);
    }, []);
    return {
        value,
        onChange,
    };
}
