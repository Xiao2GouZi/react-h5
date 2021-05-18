import { useState, useEffect } from 'react'
import { throttle } from 'lodash'

interface IWindowMousePositionRes {
    x: number,
    y: number
}

/**
 * 监听鼠标位置 PC 端
 * 
 * import React, { memo } from 'react'
 * import { WindowsMousePosition } from '@kits'
 * interface IProps { }
 * const Index: React.FC = (props: IProps) => {
 *  const position = WindowsMousePosition.useWindowMousePosition()
 *  console.log(' =====> position', position)
 *  return <React.Fragment>
 *      <div>1231231231231231</div>
 *  </React.Fragment>
 * }
 * export default memo(Index)
 * 
 */
export function useWindowMousePosition(): IWindowMousePositionRes {
    let [WindowMousePosition, setWindowMousePosition] = useState({
        x: 0,
        y: 0
    });

    function handleMouseMove(e: { pageX: number, pageY: number }) {
        setWindowMousePosition({
            x: e.pageX,
            y: e.pageY
        });
    }
    useEffect(() => {
        const mouseMove = throttle(handleMouseMove, 300)
        window.addEventListener("mousemove", mouseMove);
        return () => {
            mouseMove.cancel()
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return WindowMousePosition;
}

