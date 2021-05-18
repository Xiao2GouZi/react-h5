import { useState, useEffect } from 'react'


function getOnlineStatus() {
  return typeof navigator !== "undefined" &&
    typeof navigator.onLine === "boolean"
    ? navigator.onLine
    : true;
}

/**
 * 监听在线离线状态
 * 
 * import React, { memo } from 'react'
 * import { OnlineStatus } from '@kits'
 * interface IProps { }
 * const Index: React.FC = (props: IProps) => {
 *  const status = OnlineStatus.useOnlineStatus()
 *  console.log(' =====> status', status)
 *  return <React.Fragment>
 *     <div>1231231231231231</div>
 *  </React.Fragment>
 * }
 * export default memo(Index)
 * 
 */
export function useOnlineStatus() {
  const [onlineStatus, setOnlineStatus] = useState(getOnlineStatus());

  const goOnline = () => setOnlineStatus(true);

  const goOffline = () => setOnlineStatus(false);

  useEffect(() => {
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  return onlineStatus;
}