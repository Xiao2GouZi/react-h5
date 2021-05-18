import { useState, useCallback, useLayoutEffect } from 'react'


function getSize(el: { offsetWidth: number, offsetHeight: number }) {
    if (!el) {
        return {
            width: 0,
            height: 0
        }
    }
    return {
        width: el.offsetWidth,
        height: el.offsetHeight
    }
}

/**
 * 监听组件尺寸变化
 * @param ref 
 * 
 * import { ComponentSize } from '@kits'
 * interface IProps { }
 * const Index: React.FC = (props: IProps) => {
 *  const componentRef = useRef(null)
 *  const componentSize = ComponentSize.useComponentSize(componentRef)
 *  console.log(' =====> componentSize', componentSize)
 *  return <React.Fragment>
 *      <div ref={componentRef}>1231231231231231</div>
 *  </React.Fragment>
 * }
 * export default memo(Index)
 */
export function useComponentSize(ref: { current: any }) {
    const [ComponentSize, setComponentSize] = useState(getSize(ref ? ref.current : {}))

    const handleResize = useCallback(
        function handleResize() {
            if (ref.current) {
                setComponentSize(getSize(ref.current))
            }
        },
        [ref]
    )

    useLayoutEffect(() => {
        if (!ref.current) {
            return
        }
        handleResize()
        if (typeof ResizeObserver === 'function') {
            let resizeObserver = new ResizeObserver(function () {
                handleResize()
            })
            resizeObserver.observe(ref.current)

            return function () {
                resizeObserver.disconnect(ref.current)
                // resizeObserver = null
            }
        } else {
            window.addEventListener('resize', handleResize)

            return function () {
                window.removeEventListener('resize', handleResize)
            }
        }
    }, [ref.current])

    return ComponentSize
}



/** 
 * 组件获取
 * import React, { memo } from 'react'
 * import { ComponentSize } from '@kits'
 * interface IProps { }
 * const Index: React.FC = (props: IProps) => {
 *  const [react, componentRef] = ComponentSize.useClientRect()
 *  console.log(' =====> clientReact', react)
 *  return <React.Fragment>
 *      <div ref={componentRef}>1231231231231231</div>
 *  </React.Fragment>
 * }
 * export default memo(Index) 
*/
export function useClientRect() {
    const [rect, setRect] = useState(null);
    const ref = useCallback(node => {
        if (node !== null) {
            setRect(node.getBoundingClientRect());
        }
    }, []);
    return [rect, ref];
}

