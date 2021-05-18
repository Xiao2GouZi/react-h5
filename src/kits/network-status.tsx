import { useState, useEffect } from 'react'

interface INetworkStatus {
    /** 网络下行速度 */
    downlink: number
    /** 网络类型 */
    effectiveType: string
    /** 有值代表网络状态变更 */
    onchange: string
    /** 估算的往返时间 */
    rtt: number
    /** 打开/请求数据保护模式 */
    saveData: boolean
}


/**
 * 网络状态
 * 
 * import React, { memo } from 'react'
 * import { NetworkStatus } from '@kits'
 * interface IProps { }
 * const Index: React.FC = (props: IProps) => {
 *  const status = NetworkStatus.useNetworkStatus()
 *  console.log(' =====> status', status)
 *  return <React.Fragment>
 *     <div>1231231231231231</div>
 *  </React.Fragment>
 *  }
 * export default memo(Index)
 */
export function useNetworkStatus(): INetworkStatus {
    function getConnection() {
        const navigator: any = window.navigator
        return navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    }

    let [connection, updateNetworkConnection] = useState(getConnection());

    useEffect(() => {
        function updateConnectionStatus() {
            updateNetworkConnection(getConnection());
        }

        connection.addEventListener("change", updateConnectionStatus);
        return () => {
            connection.removeEventListener("change", updateConnectionStatus);
        };
    }, [connection]);

    return connection;
}