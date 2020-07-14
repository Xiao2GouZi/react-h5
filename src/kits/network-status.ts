import { useState, useEffect } from 'react'

interface INetworkStatus {
    downlink: number
    effectiveType: string
    onchange: string
    rtt: number
    saveData: boolean
}

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

/**
 * 
 * function MyComponent() {
 *  let connection = useNetworkStatus();
 *  return (
 *      <div>
 *          <div>downlink: {connection.downlink}</div>
 *          <div>effectiveType: {connection.effectiveType}</div>
 *          <div>rtt: {connection.rtt}</div>
 *          <div>saveData: {connection.saveData ? "yes" : "no"}</div>
 *      </div>
 *  );
 * }
 * 
 */
