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

export function useComponentSize(ref: {current: any}) {
    const _useState = useState(getSize(ref ? ref.current : {}))
    const ComponentSize = _useState[0]
    const setComponentSize = _useState[1]

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
                resizeObserver = null
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
 * 
 * function MyComponent() {
 *  let ref = useRef(null)
 *  let size = useComponentSize(ref)
 *  // size == { width: 100, height: 200 }
 *  let { width, height } = size
 *  let imgUrl = `https://via.placeholder.com/${width}x${height}`
 *  return (
 *      <div style={{ width: '100%', height: '100%' }}>
 *          <img ref={ref} src={imgUrl} />
 *      </div>
 *  )
 * }
 * 
 */
