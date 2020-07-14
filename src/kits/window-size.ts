
import { useState, useEffect } from 'react'

export interface IWindowInfo {
    innerHeight: number,
    innerWidth: number,
    outerHeight: number,
    outerWidth: number
}

/** 监听页面尺寸大小变化 */
export function useWindowSize(): IWindowInfo {
    function getSize() {
        return {
            innerHeight: window.innerHeight,
            innerWidth: window.innerWidth,
            outerHeight: window.outerHeight,
            outerWidth: window.outerWidth
        };
    }

    let [windowSize, setWindowSize] = useState(getSize());

    function handleResize() {
        setWindowSize(getSize());
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return windowSize;
}

/**
 * 
 * 
 * function MyComponent() {
 *  let windowSize = useWindowSize();
 *  // {
 *  //   innerWidth: window.innerWidth,
 *  //   innerHeight: window.innerHeight,
 *  //   outerWidth: window.outerWidth,
 *  //   outerHeight: window.outerHeight,
 *  // }
 *  // ...
 * }
 * 
 * 
 */