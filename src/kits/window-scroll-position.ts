import { useState, useEffect } from 'react'
import { throttle } from 'lodash'


let supportsPassive = false
try {
    var opts = Object.defineProperty({}, 'passive', {
        get: function () {
            supportsPassive = true
        },
    })
    const testPassive = () => { }
    window.addEventListener('testPassive', testPassive, opts)
    window.removeEventListener('testPassive', testPassive, opts)
} catch (e) { }

let getPosition = () => ({
    x: window.pageXOffset,
    y: window.pageYOffset,
})

let defaultOptions = {
    throttle: 100,
}

export interface IOption {
    throttle: number
}

/**
 * 
 * @param options 
 */
export function useWindowScrollPosition(options?: IOption): { x: number, y: number } {
    let opts = Object.assign({}, defaultOptions, options)

    let [position, setPosition] = useState(getPosition())

    useEffect(() => {
        let handleScroll = throttle(() => {
            setPosition(getPosition())
        }, opts.throttle)

        window.addEventListener(
            'scroll',
            handleScroll,
            supportsPassive ? { passive: true } : false
        )

        return () => {
            handleScroll.cancel()
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return position
}


/** 
 * 
 * function MyComponent() {
 *  // optionally you can pass options, those are default:
 *  let options = {
 *      throttle: 100,
 *  }
 *  let position = useWindowScrollPosition(options)
 *  // position == { x: 0, y: 0 }
 *  return <div />
 * }
 * 
 */
